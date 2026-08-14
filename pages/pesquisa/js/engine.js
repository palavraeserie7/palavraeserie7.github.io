/*
 * MATRIZ DE ANÁLISE BÍBLICA
 * ENGINE — EXECUÇÃO INDEPENDENTE DOS ANLs
 *
 * Regra fundamental:
 * Cada ANL recebe diretamente o alvo original.
 * A falha de um ANL NÃO interrompe os demais.
 *
 * Estados possíveis:
 * COMPLETED
 * PARTIAL
 * NO_DATA
 * ERROR
 */

function normalizarTexto(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }

  return String(valor).trim();
}

function criarAlvo(tema, passagem, contexto = "") {
  const alvoTema = normalizarTexto(tema);
  const alvoPassagem = normalizarTexto(passagem);
  const alvoContexto = normalizarTexto(contexto);

  return {
    tema: alvoTema,
    passagem: alvoPassagem,
    alvo: alvoPassagem || alvoTema,
    contexto: alvoContexto
  };
}

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

function normalizarResultado(id, titulo, entrada, resultado) {
  const status = classificarResultado(resultado);

  return {
    id,
    titulo: titulo || id,
    status,

    entrada,

    fontes: Array.isArray(resultado?.fontes)
      ? resultado.fontes
      : [],

    evidencias: Array.isArray(resultado?.evidencias)
      ? resultado.evidencias
      : [],

    achados: Array.isArray(resultado?.achados)
      ? resultado.achados
      : [],

    pendencias: Array.isArray(resultado?.pendencias)
      ? resultado.pendencias
      : [],

    observacao:
      resultado?.observacao ||
      resultado?.mensagem ||
      ""
  };
}


/*
 * EXECUTA UM ÚNICO ANL
 *
 * Importante:
 * Não recebe resultado de outro ANL.
 * Recebe somente o alvo original.
 */
export async function executarANL(anl, alvo) {
  const id = anl?.id || "ANL-DESCONHECIDO";
  const titulo = anl?.titulo || id;

  const entrada = {
    alvo: {
      ...alvo
    }
  };

  try {
    if (typeof anl?.executar !== "function") {
      return normalizarResultado(
        id,
        titulo,
        entrada,
        {
          status: "NO_DATA",
          fontes: [],
          evidencias: [],
          achados: [],
          pendencias: [
            "Este ANL não possui função executar() disponível."
          ],
          observacao:
            "Módulo carregado, mas sem executor disponível."
        }
      );
    }

    /*
     * O ANL recebe uma cópia do alvo.
     *
     * Assim, um módulo não pode modificar
     * acidentalmente a entrada dos outros.
     */
    const alvoIndependente = {
      ...alvo
    };

    const resultado = await anl.executar(alvoIndependente);

    return normalizarResultado(
      id,
      titulo,
      entrada,
      resultado
    );

  } catch (erro) {

    /*
     * ERRO DE UM ANL NÃO SOBE PARA O EXECUTOR PRINCIPAL.
     *
     * Ele vira um resultado ERROR e a investigação continua.
     */
    return {
      id,
      titulo,
      status: "ERROR",

      entrada,

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [
        "O módulo encontrou um erro durante a execução."
      ],

      observacao:
        erro?.message ||
        "Erro desconhecido durante a execução.",

      erro: {
        mensagem:
          erro?.message ||
          String(erro)
      }
    };
  }
}


/*
 * EXECUTA TODOS OS ANLs DE FORMA INDEPENDENTE.
 *
 * Todos recebem o mesmo alvo original.
 *
 * Um erro não interrompe a execução.
 */
export async function executarMatriz(
  matriz,
  {
    tema = "",
    passagem = "",
    contexto = ""
  } = {}
) {

  const alvo = criarAlvo(
    tema,
    passagem,
    contexto
  );

  const lista = Array.isArray(matriz)
    ? matriz
    : [];

  /*
   * Promise.allSettled é proposital.
   *
   * Mesmo que algum executor rejeite uma Promise,
   * os demais continuam sendo processados.
   */
  const promessas = lista.map((anl) =>
    executarANL(anl, alvo)
  );

  const resultados = await Promise.allSettled(
    promessas
  );

  return resultados.map((item, indice) => {

    if (item.status === "fulfilled") {
      return item.value;
    }

    const anl = lista[indice];

    return {
      id: anl?.id || `ANL-${indice + 1}`,
      titulo: anl?.titulo || "",
      status: "ERROR",

      entrada: {
        alvo: {
          ...alvo
        }
      },

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [
        "O executor externo falhou."
      ],

      observacao:
        item.reason?.message ||
        "Falha desconhecida no executor.",

      erro: {
        mensagem:
          item.reason?.message ||
          String(item.reason)
      }
    };
  });
}


/*
 * RESUMO DA MATRIZ
 */
export function resumirMatriz(resultados) {

  const lista = Array.isArray(resultados)
    ? resultados
    : [];

  const resumo = {
    total: lista.length,
    COMPLETED: 0,
    PARTIAL: 0,
    NO_DATA: 0,
    ERROR: 0
  };

  for (const resultado of lista) {

    const status =
      resultado?.status || "ERROR";

    if (
      Object.prototype.hasOwnProperty.call(
        resumo,
        status
      )
    ) {
      resumo[status]++;
    } else {
      resumo.ERROR++;
    }
  }

  return resumo;
}


/*
 * RETORNA SOMENTE RESULTADOS COM DADOS.
 *
 * Útil para o ANL-12.
 *
 * ANL-12 não deve fingir que recebeu informação
 * de um ANL que não encontrou nada.
 */
export function resultadosDisponiveis(resultados) {

  if (!Array.isArray(resultados)) {
    return [];
  }

  return resultados.filter((resultado) => {

    if (!resultado) {
      return false;
    }

    if (
      resultado.status === "COMPLETED" ||
      resultado.status === "PARTIAL"
    ) {
      return true;
    }

    return false;
  });
}


/*
 * EXECUÇÃO ESPECIAL DA SÍNTESE
 *
 * O ANL-12 recebe:
 *
 * 1. o alvo original
 * 2. somente os resultados realmente disponíveis
 *
 * Ele não depende de todos os outros ANLs.
 */
export async function executarSintese(
  anl12,
  alvo,
  resultados
) {

  if (!anl12) {
    return {
      id: "ANL-12",
      titulo: "SÍNTESE",
      status: "NO_DATA",

      entrada: {
        alvo: {
          ...alvo
        }
      },

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [
        "ANL-12 não está disponível."
      ],

      observacao:
        "Não foi possível executar a síntese."
    };
  }

  const disponiveis =
    resultadosDisponiveis(resultados);

  try {

    if (typeof anl12.executar !== "function") {
      return {
        id: "ANL-12",
        titulo:
          anl12.titulo || "SÍNTESE",
        status: "NO_DATA",

        entrada: {
          alvo: {
            ...alvo
          }
        },

        fontes: [],
        evidencias: [],
        achados: [],

        pendencias: [
          "ANL-12 não possui executor."
        ],

        observacao:
          "A síntese não possui função executar()."
      };
    }

    const entradaSintese = {
      alvo: {
        ...alvo
      },

      resultadosDisponiveis:
        disponiveis
    };

    const resultado =
      await anl12.executar(
        entradaSintese
      );

    return normalizarResultado(
      anl12.id || "ANL-12",
      anl12.titulo || "SÍNTESE",
      entradaSintese,
      resultado
    );

  } catch (erro) {

    return {
      id: anl12.id || "ANL-12",
      titulo:
        anl12.titulo || "SÍNTESE",
      status: "ERROR",

      entrada: {
        alvo: {
          ...alvo
        },

        resultadosDisponiveis:
          disponiveis
      },

      fontes: [],
      evidencias: [],
      achados: [],

      pendencias: [
        "Erro durante a síntese."
      ],

      observacao:
        erro?.message ||
        "Erro desconhecido na síntese.",

      erro: {
        mensagem:
          erro?.message ||
          String(erro)
      }
    };
  }
}
