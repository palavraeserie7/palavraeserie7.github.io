/*
 * MATRIZ DE ANÁLISE BÍBLICA
 * ENGINE — EXECUÇÃO INDEPENDENTE DOS ANLs
 *
 * REGRA FUNDAMENTAL:
 *
 * 1. Todo ANL recebe diretamente o alvo original.
 * 2. A falha de um ANL NÃO interrompe os demais.
 * 3. Cada ANL possui seu próprio estado.
 * 4. Um ANL pode retornar COMPLETED, PARTIAL, NO_DATA ou ERROR.
 * 5. Nenhum ANL deve fingir que consultou uma fonte que não consultou.
 * 6. O ANL-12 recebe os resultados disponíveis para fazer a síntese.
 */

/* =========================================================
   NORMALIZAÇÃO
   ========================================================= */

function normalizarTexto(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }

  return String(valor).trim();
}


/* =========================================================
   ALVO ORIGINAL
   ========================================================= */

function criarAlvo(tema, passagem, contexto = "") {
  const alvoTema = normalizarTexto(tema);
  const alvoPassagem = normalizarTexto(passagem);
  const alvoContexto = normalizarTexto(contexto);

  return {
    tema: alvoTema,
    passagem: alvoPassagem,

    /*
     * Se existe passagem, ela é o alvo principal.
     * Caso contrário, utiliza o tema.
     */
    alvo: alvoPassagem || alvoTema,

    contexto: alvoContexto
  };
}


/* =========================================================
   CLASSIFICAÇÃO DOS RESULTADOS
   ========================================================= */

function classificarResultado(resultado) {

  if (!resultado) {
    return "NO_DATA";
  }

  if (resultado.status) {
    const status = String(resultado.status).toUpperCase();

    if (
      status === "COMPLETED" ||
      status === "PARTIAL" ||
      status === "NO_DATA" ||
      status === "ERROR"
    ) {
      return status;
    }
  }

  const evidencias = Array.isArray(resultado.evidencias)
    ? resultado.evidencias
    : [];

  const achados = Array.isArray(resultado.achados)
    ? resultado.achados
    : [];

  if (evidencias.length > 0 || achados.length > 0) {
    return "COMPLETED";
  }

  return "NO_DATA";
}


/* =========================================================
   NORMALIZAÇÃO DE RESULTADO DE UM ANL
   ========================================================= */

function normalizarResultadoANL(id, titulo, resultado, alvo) {

  /*
   * O módulo não retornou nada.
   */
  if (!resultado) {
    return {
      id,
      titulo,
      status: "NO_DATA",

      entrada: {
        alvo
      },

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [
        "O módulo não retornou dados."
      ],

      limitacoes: [
        "Nenhum resultado foi produzido pelo módulo."
      ],

      observacao:
        "O ANL foi executado independentemente, mas não produziu dados."
    };
  }


  /*
   * Caso o próprio ANL tenha retornado um objeto completo.
   */
  const status = classificarResultado(resultado);

  return {
    id,

    titulo,

    status,

    entrada: {
      alvo
    },

    fontes: Array.isArray(resultado.fontes)
      ? resultado.fontes
      : [],

    evidencias: Array.isArray(resultado.evidencias)
      ? resultado.evidencias
      : [],

    achados: Array.isArray(resultado.achados)
      ? resultado.achados
      : [],

    pendencias: Array.isArray(resultado.pendencias)
      ? resultado.pendencias
      : [],

    limitacoes: Array.isArray(resultado.limitacoes)
      ? resultado.limitacoes
      : [],

    observacao:
      resultado.observacao ||
      resultado.mensagem ||
      "ANL executado."
  };
}


/* =========================================================
   EXECUÇÃO SEGURA DE UM ANL
   ========================================================= */

/*
 * Esta função é extremamente importante.
 *
 * Se um ANL falhar:
 *
 * - registra ERROR;
 * - não lança novamente o erro;
 * - não interrompe a investigação;
 * - permite que os outros ANLs continuem.
 */

async function executarANLSeguro(
  id,
  titulo,
  modulo,
  alvo,
  contextoExecucao = {}
) {

  try {

    if (!modulo) {
      return {
        id,
        titulo,
        status: "NO_DATA",

        entrada: {
          alvo
        },

        fontes: [],
        evidencias: [],
        achados: [],

        pendencias: [
          "Módulo não disponível."
        ],

        limitacoes: [
          "O arquivo do ANL não pôde ser carregado."
        ],

        observacao:
          "O ANL foi mantido independente dos demais."
      };
    }


    /*
     * Cada ANL recebe SEMPRE o alvo original.
     *
     * O contexto dos demais resultados é apenas
     * informação adicional e NÃO é requisito para
     * a execução.
     */
    let resultado;


    /*
     * Aceita diferentes formatos de exportação.
     */

    if (typeof modulo.executar === "function") {

      resultado = await modulo.executar(
        alvo,
        contextoExecucao
      );

    } else if (typeof modulo.analisar === "function") {

      resultado = await modulo.analisar(
        alvo,
        contextoExecucao
      );

    } else if (typeof modulo.default === "function") {

      resultado = await modulo.default(
        alvo,
        contextoExecucao
      );

    } else if (typeof modulo === "function") {

      resultado = await modulo(
        alvo,
        contextoExecucao
      );

    } else {

      throw new Error(
        `O módulo ${id} não possui uma função de execução compatível.`
      );
    }


    return normalizarResultadoANL(
      id,
      titulo,
      resultado,
      alvo
    );

  } catch (erro) {

    console.error(
      `[${id}] erro isolado:`,
      erro
    );

    return {
      id,
      titulo,
      status: "ERROR",

      entrada: {
        alvo
      },

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [],

      limitacoes: [
        erro?.message
          ? erro.message
          : "Erro desconhecido durante a execução."
      ],

      observacao:
        "O ANL apresentou erro, mas a investigação principal não foi interrompida."
    };
  }
}


/* =========================================================
   CARREGAMENTO DOS ANLs
   ========================================================= */

/*
 * IMPORTANTE:
 *
 * Os módulos ficam em:
 *
 * /etapas/anl-01.js
 * /etapas/anl-02.js
 * ...
 * /etapas/anl-12.js
 *
 * O engine está em:
 *
 * /pages/pesquisa/js/engine.js
 *
 * Portanto o caminho é ../../../etapas/
 */

async function carregarModulo(numero) {

  const numeroFormatado = String(numero).padStart(2, "0");

  const caminho =
    `../../../etapas/anl-${numeroFormatado}.js`;

  try {

    return await import(caminho);

  } catch (erro) {

    console.error(
      `Não foi possível carregar ANL-${numeroFormatado}:`,
      erro
    );

    return null;
  }
}


/* =========================================================
   DEFINIÇÃO DOS 12 ANLs
   ========================================================= */

const DEFINICOES_ANL = [

  {
    id: "ANL-01",
    titulo: "TEXTO E MANUSCRITOS"
  },

  {
    id: "ANL-02",
    titulo: "TRADUÇÃO E TEXTO ORIGINAL"
  },

  {
    id: "ANL-03",
    titulo: "GRAMÁTICA E SINTAXE"
  },

  {
    id: "ANL-04",
    titulo: "PALAVRAS E SEMÂNTICA"
  },

  {
    id: "ANL-05",
    titulo: "SIGNIFICADO TEOLÓGICO"
  },

  {
    id: "ANL-06",
    titulo: "EXEGESE E CONTEXTO LITERÁRIO"
  },

  {
    id: "ANL-07",
    titulo: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO"
  },

  {
    id: "ANL-08",
    titulo: "CONTEXTO GEOGRÁFICO E POLÍTICO"
  },

  {
    id: "ANL-09",
    titulo: "RELAÇÃO COM O RESTANTE DA ESCRITURA"
  },

  {
    id: "ANL-10",
    titulo: "HERMENÊUTICA E CONTROLE"
  },

  {
    id: "ANL-11",
    titulo: "TEOLOGIA E COMPARAÇÃO"
  },

  {
    id: "ANL-12",
    titulo: "SÍNTESE"
  }

];


/* =========================================================
   EXECUÇÃO PRINCIPAL
   ========================================================= */

async function executarInvestigacao(
  tema,
  passagem,
  contexto = ""
) {

  const alvo = criarAlvo(
    tema,
    passagem,
    contexto
  );


  /*
   * Validação mínima.
   */

  if (!alvo.tema && !alvo.passagem) {

    throw new Error(
      "Informe pelo menos um tema ou uma passagem bíblica."
    );
  }


  /*
   * Estado global da investigação.
   */

  const investigacao = {

    alvo,

    status: "RUNNING",

    inicio: new Date().toISOString(),

    resultados: [],

    resumo: {
      COMPLETED: 0,
      PARTIAL: 0,
      NO_DATA: 0,
      ERROR: 0
    }
  };


  /* =======================================================
     ANL-01 ATÉ ANL-11
     ======================================================= */

  /*
   * NÃO usamos:
   *
   * resultadoAnterior
   *
   * como entrada obrigatória.
   *
   * Cada ANL recebe o alvo ORIGINAL.
   */

  for (let i = 0; i < 11; i++) {

    const definicao = DEFINICOES_ANL[i];

    let modulo = null;

    try {
      modulo = await carregarModulo(i + 1);
    } catch (erro) {
      modulo = null;
    }


    /*
     * O contexto contém os resultados anteriores,
     * mas nenhum ANL depende deles para funcionar.
     */

    const contextoANL = {

      alvoOriginal: alvo,

      resultadosAnteriores:
        investigacao.resultados.slice(),

      investigacao: {
        tema: alvo.tema,
        passagem: alvo.passagem
      }
    };


    const resultado = await executarANLSeguro(

      definicao.id,

      definicao.titulo,

      modulo,

      alvo,

      contextoANL

    );


    investigacao.resultados.push(
      resultado
    );


    /*
     * Atualiza contador imediatamente.
     */

    const status = resultado.status;

    if (
      Object.prototype.hasOwnProperty.call(
        investigacao.resumo,
        status
      )
    ) {
      investigacao.resumo[status]++;
    }

  }


  /* =======================================================
     ANL-12 — SÍNTESE
     ======================================================= */

  const definicaoSintese =
    DEFINICOES_ANL[11];

  let moduloSintese = null;

  try {
    moduloSintese =
      await carregarModulo(12);
  } catch (erro) {
    moduloSintese = null;
  }


  /*
   * ANL-12 recebe todos os resultados disponíveis.
   *
   * Mas mesmo se nenhum ANL anterior funcionar,
   * ele ainda é executado.
   */

  const contextoSintese = {

    alvoOriginal: alvo,

    resultados:
      investigacao.resultados.slice(),

    resultadosDisponiveis:
      investigacao.resultados.filter(
        resultado =>
          resultado.status === "COMPLETED" ||
          resultado.status === "PARTIAL"
      ),

    resumo:
      { ...investigacao.resumo }

  };


  const resultadoSintese =
    await executarANLSeguro(

      definicaoSintese.id,

      definicaoSintese.titulo,

      moduloSintese,

      alvo,

      contextoSintese

    );


  investigacao.resultados.push(
    resultadoSintese
  );


  if (
    Object.prototype.hasOwnProperty.call(
      investigacao.resumo,
      resultadoSintese.status
    )
  ) {
    investigacao.resumo[
      resultadoSintese.status
    ]++;
  }


  /* =======================================================
     ESTADO FINAL
     ======================================================= */

  investigacao.fim =
    new Date().toISOString();


  const quantidadeCompletos =
    investigacao.resumo.COMPLETED;

  const quantidadeParciais =
    investigacao.resumo.PARTIAL;

  const quantidadeDados =
    quantidadeCompletos +
    quantidadeParciais;


  /*
   * A investigação nunca é considerada totalmente
   * perdida simplesmente porque algum ANL falhou.
   */

  if (quantidadeDados > 0) {

    investigacao.status = "PARTIAL";

  } else if (
    investigacao.resumo.ERROR === 12
  ) {

    investigacao.status = "ERROR";

  } else {

    investigacao.status = "NO_DATA";
  }


  return investigacao;
}


/* =========================================================
   FUNÇÕES AUXILIARES PARA A INTERFACE
   ========================================================= */

function obterResumoInvestigacao(investigacao) {

  if (!investigacao) {

    return {
      COMPLETED: 0,
      PARTIAL: 0,
      NO_DATA: 0,
      ERROR: 0
    };

  }

  return {
    COMPLETED:
      investigacao.resumo?.COMPLETED || 0,

    PARTIAL:
      investigacao.resumo?.PARTIAL || 0,

    NO_DATA:
      investigacao.resumo?.NO_DATA || 0,

    ERROR:
      investigacao.resumo?.ERROR || 0
  };
}


function obterResultadoANL(
  investigacao,
  id
) {

  if (
    !investigacao ||
    !Array.isArray(investigacao.resultados)
  ) {
    return null;
  }

  return (
    investigacao.resultados.find(
      resultado =>
        resultado.id === id
    ) || null
  );
}


/* =========================================================
   EXPORTAÇÕES
   ========================================================= */

export {

  normalizarTexto,

  criarAlvo,

  classificarResultado,

  normalizarResultadoANL,

  executarANLSeguro,

  carregarModulo,

  executarInvestigacao,

  obterResumoInvestigacao,

  obterResultadoANL

};
