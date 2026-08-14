/*
 * ============================================================
 * MATRIZ DE ANÁLISE BÍBLICA
 * ENGINE — MOTOR DE PESQUISA
 * ============================================================
 *
 * REGRA FUNDAMENTAL
 *
 * Cada ANL é INDEPENDENTE.
 *
 * A ausência de dados em um ANL:
 *     NÃO interrompe os demais.
 *
 * Estados possíveis:
 *
 *     COMPLETED
 *     PARTIAL
 *     NO_DATA
 *     ERROR
 *
 * ERROR só deve ser usado quando ocorrer uma falha real
 * de execução do próprio módulo.
 *
 * Nenhum módulo deve depender da existência de resultado
 * dos módulos anteriores para funcionar.
 * ============================================================
 */

const ANL_DEFINITIONS = [

    {
        id: "ANL-01",
        titulo: "TEXTO E MANUSCRITOS",
        fontes: [
            "NA28",
            "BHS",
            "BHQ",
            "SBLGNT",
            "Septuaginta",
            "Testemunhos textuais"
        ],
        objetivo:
            "Investigar o texto bíblico e os testemunhos textuais relacionados ao alvo."
    },

    {
        id: "ANL-02",
        titulo: "TRADUÇÃO E TEXTO ORIGINAL",
        fontes: [
            "Hebraico",
            "Aramaico",
            "Grego",
            "Septuaginta",
            "Traduções bíblicas"
        ],
        objetivo:
            "Comparar o texto original e traduções verificáveis."
    },

    {
        id: "ANL-03",
        titulo: "GRAMÁTICA E SINTAXE",
        fontes: [
            "Dados morfológicos",
            "Gramáticas hebraicas",
            "Gramáticas aramaicas",
            "Gramáticas gregas",
            "Dados sintáticos"
        ],
        objetivo:
            "Investigar morfologia, sintaxe e estrutura gramatical."
    },

    {
        id: "ANL-04",
        titulo: "PALAVRAS E SEMÂNTICA",
        fontes: [
            "BDAG",
            "HALOT",
            "BDB",
            "LSJ",
            "Strong",
            "Lemas",
            "Campos semânticos"
        ],
        objetivo:
            "Investigar o significado lexical e o sentido contextual."
    },

    {
        id: "ANL-05",
        titulo: "SIGNIFICADO TEOLÓGICO",
        fontes: [
            "NIDNTTE",
            "NIDOTTE",
            "TDNT",
            "TDOT",
            "Teologia bíblica"
        ],
        objetivo:
            "Investigar implicações e categorias de teologia bíblica relacionadas ao texto."
    },

    {
        id: "ANL-06",
        titulo: "EXEGESE E CONTEXTO LITERÁRIO",
        fontes: [
            "BECNT",
            "NIGTC",
            "NICNT",
            "Pillar",
            "WBC",
            "NICOT",
            "AOTC",
            "Baker OT"
        ],
        objetivo:
            "Investigar contexto imediato, estrutura literária e argumento do autor."
    },

    {
        id: "ANL-07",
        titulo: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO",
        fontes: [
            "Zondervan Encyclopedia",
            "IVP Bible Background Commentary",
            "New Bible Dictionary",
            "ANET",
            "Context of Scripture",
            "Manners and Customs"
        ],
        objetivo:
            "Investigar o contexto histórico, cultural e religioso."
    },

    {
        id: "ANL-08",
        titulo: "CONTEXTO GEOGRÁFICO E POLÍTICO",
        fontes: [
            "Atlas bíblico",
            "Zondervan Atlas",
            "Arqueologia",
            "Fontes históricas",
            "Dados geográficos"
        ],
        objetivo:
            "Investigar localização, geografia, arqueologia e contexto político."
    },

    {
        id: "ANL-09",
        titulo: "RELAÇÃO COM O RESTANTE DA ESCRITURA",
        fontes: [
            "Beale",
            "Beale & Carson",
            "Vos",
            "Goldsworthy",
            "Schreiner"
        ],
        objetivo:
            "Investigar citações, alusões, ecos e relações intertextuais."
    },

    {
        id: "ANL-10",
        titulo: "HERMENÊUTICA E CONTROLE",
        fontes: [
            "Grant Osborne",
            "D. A. Carson",
            "Carson & Moo",
            "Dillard & Longman",
            "Fee & Stuart"
        ],
        objetivo:
            "Controlar interpretações e detectar problemas hermenêuticos."
    },

    {
        id: "ANL-11",
        titulo: "TEOLOGIA E COMPARAÇÃO",
        fontes: [
            "Grudem",
            "Berkhof",
            "Frame",
            "Evangelical Dictionary of Theology",
            "Comentários bíblicos"
        ],
        objetivo:
            "Comparar interpretações teológicas e registrar concordâncias e divergências."
    },

    {
        id: "ANL-12",
        titulo: "SÍNTESE",
        fontes: [
            "Base de evidências validada"
        ],
        objetivo:
            "Produzir uma síntese baseada somente nas evidências realmente disponíveis."
    }

];


/* ============================================================
 * UTILIDADES
 * ============================================================ */

function textoSeguro(valor) {

    if (valor === null || valor === undefined) {
        return "";
    }

    return String(valor).trim();
}


function criarAlvo(tema, passagem, contexto = "") {

    const alvoTema = textoSeguro(tema);
    const alvoPassagem = textoSeguro(passagem);
    const alvoContexto = textoSeguro(contexto);

    return {
        tema: alvoTema,
        passagem: alvoPassagem,
        alvo: alvoPassagem || alvoTema,
        contexto: alvoContexto
    };
}


/* ============================================================
 * CLASSIFICAÇÃO
 * ============================================================ */

function classificarResultado(resultado) {

    if (!resultado) {
        return "NO_DATA";
    }

    if (resultado.erro === true) {
        return "ERROR";
    }

    if (Array.isArray(resultado.evidencias) &&
        resultado.evidencias.length > 0) {

        if (
            Array.isArray(resultado.pendencias) &&
            resultado.pendencias.length > 0
        ) {
            return "PARTIAL";
        }

        return "COMPLETED";
    }

    if (
        Array.isArray(resultado.achados) &&
        resultado.achados.length > 0
    ) {
        return "PARTIAL";
    }

    return "NO_DATA";
}


/* ============================================================
 * RESULTADO VAZIO
 * ============================================================ */

function criarResultadoVazio(definicao, alvo) {

    return {

        id: definicao.id,

        titulo: definicao.titulo,

        status: "NO_DATA",

        entrada: {
            alvo: alvo
        },

        fontes: definicao.fontes,

        evidencias: [],

        achados: [],

        pendencias: [
            "Nenhuma fonte de dados conectada para esta etapa."
        ],

        limitacoes: [
            "Este módulo não possui dados externos disponíveis nesta execução."
        ],

        objetivo: definicao.objetivo,

        observacao:
            "O módulo foi executado de forma independente, mas nenhuma evidência verificável foi disponibilizada."
    };
}


/* ============================================================
 * EXECUÇÃO DE UM ANL
 * ============================================================ */

async function executarANL(definicao, alvo, contextoPesquisa = {}) {

    try {

        /*
         * IMPORTANTE:
         *
         * O ANL recebe DIRETAMENTE o alvo original.
         *
         * Não recebe o resultado do ANL anterior.
         * Não depende de etapaAnterior.
         * Não depende de ANL-01.
         * Não depende de ANL-02.
         */

        const entrada = {
            alvo: alvo,
            contextoPesquisa: contextoPesquisa
        };


        /*
         * Neste momento ainda não existe um conector externo
         * real para as fontes acadêmicas.
         *
         * Portanto, o comportamento correto é NO_DATA.
         *
         * NÃO é ERROR.
         */

        const resultado = criarResultadoVazio(
            definicao,
            alvo
        );

        resultado.entrada = entrada;

        return resultado;

    } catch (erro) {

        /*
         * Somente uma falha REAL de execução chega aqui.
         */

        return {

            id: definicao.id,

            titulo: definicao.titulo,

            status: "ERROR",

            entrada: {
                alvo: alvo
            },

            fontes: definicao.fontes,

            evidencias: [],

            achados: [],

            pendencias: [],

            limitacoes: [],

            erro: true,

            mensagemErro:
                erro instanceof Error
                    ? erro.message
                    : String(erro),

            observacao:
                "Ocorreu uma falha real durante a execução deste módulo."
        };
    }
}


/* ============================================================
 * EXECUÇÃO DOS 12 ANLs
 *
 * CADA ANL É INDEPENDENTE.
 * ============================================================ */

async function executarInvestigacao(tema, passagem, contexto = "") {

    const alvo = criarAlvo(
        tema,
        passagem,
        contexto
    );


    /*
     * Nenhum ANL deve ser executado se não houver alvo.
     *
     * Porém, isso também NÃO deve gerar ERROR.
     */

    if (!alvo.tema && !alvo.passagem) {

        return {

            tema: "",
            passagem: "",

            alvo: alvo,

            status: "NO_DATA",

            resultados: ANL_DEFINITIONS.map(definicao => {

                return criarResultadoVazio(
                    definicao,
                    alvo
                );

            }),

            resumo: {
                completed: 0,
                partial: 0,
                noData: ANL_DEFINITIONS.length,
                error: 0
            },

            estadoFinal: "NO_DATA",

            observacao:
                "Nenhum tema ou passagem foi informado."
        };
    }


    /*
     * --------------------------------------------------------
     * EXECUÇÃO INDEPENDENTE
     * --------------------------------------------------------
     *
     * Promise.allSettled garante que uma falha isolada
     * não interrompa os demais módulos.
     */

    const execucoes = ANL_DEFINITIONS.map(
        definicao =>
            executarANL(
                definicao,
                alvo,
                {
                    tema: alvo.tema,
                    passagem: alvo.passagem,
                    contexto: alvo.contexto
                }
            )
    );


    const resultadosBrutos =
        await Promise.allSettled(execucoes);


    const resultados =
        resultadosBrutos.map(
            (resultado, indice) => {

                const definicao =
                    ANL_DEFINITIONS[indice];

                /*
                 * Uma Promise rejeitada é convertida
                 * em ERROR SOMENTE para aquele ANL.
                 */

                if (resultado.status === "rejected") {

                    return {

                        id: definicao.id,

                        titulo: definicao.titulo,

                        status: "ERROR",

                        entrada: {
                            alvo: alvo
                        },

                        fontes: definicao.fontes,

                        evidencias: [],

                        achados: [],

                        pendencias: [],

                        limitacoes: [],

                        erro: true,

                        mensagemErro:
                            resultado.reason
                                ? String(resultado.reason)
                                : "Falha desconhecida.",

                        observacao:
                            "Este ANL apresentou erro, mas os demais módulos continuam independentes."
                    };
                }


                const valor = resultado.value;

                /*
                 * Segurança adicional:
                 * qualquer resultado inválido vira NO_DATA,
                 * não ERROR.
                 */

                if (!valor) {

                    return criarResultadoVazio(
                        definicao,
                        alvo
                    );
                }

                /*
                 * O status é determinado pelo próprio conteúdo.
                 */

                valor.status =
                    classificarResultado(valor);

                return valor;
            }
        );


    /*
     * --------------------------------------------------------
     * CONTAGEM DOS ESTADOS
     * --------------------------------------------------------
     */

    let completed = 0;
    let partial = 0;
    let noData = 0;
    let error = 0;


    resultados.forEach(resultado => {

        switch (resultado.status) {

            case "COMPLETED":
                completed++;
                break;

            case "PARTIAL":
                partial++;
                break;

            case "ERROR":
                error++;
                break;

            case "NO_DATA":
            default:
                noData++;
                break;
        }

    });


    /*
     * --------------------------------------------------------
     * ESTADO FINAL
     * --------------------------------------------------------
     *
     * A existência de um NO_DATA não transforma a pesquisa
     * inteira em ERROR.
     *
     * O estado geral é determinado pelo conjunto.
     */

    let estadoFinal = "NO_DATA";


    if (completed > 0 || partial > 0) {

        if (error > 0 || noData > 0) {
            estadoFinal = "PARTIAL";
        } else {
            estadoFinal = "COMPLETED";
        }

    } else if (error === resultados.length) {

        estadoFinal = "ERROR";

    } else {

        estadoFinal = "NO_DATA";
    }


    return {

        tema: alvo.tema,

        passagem: alvo.passagem,

        alvo: alvo,

        status: estadoFinal,

        resultados: resultados,

        resumo: {

            completed: completed,

            partial: partial,

            noData: noData,

            error: error
        },

        estadoFinal: estadoFinal,

        observacao:
            "Os 12 ANLs foram executados independentemente. A ausência de dados em um módulo não interrompe os demais."
    };
}


/* ============================================================
 * FUNÇÕES AUXILIARES PARA A INTERFACE
 * ============================================================ */

function obterDefinicoesANL() {

    return ANL_DEFINITIONS.map(
        definicao => ({
            ...definicao
        })
    );
}


function obterANL(id) {

    return ANL_DEFINITIONS.find(
        definicao => definicao.id === id
    ) || null;
}


function obterResumo(resultados) {

    const lista =
        Array.isArray(resultados)
            ? resultados
            : [];

    return {

        completed:
            lista.filter(
                item => item.status === "COMPLETED"
            ).length,

        partial:
            lista.filter(
                item => item.status === "PARTIAL"
            ).length,

        noData:
            lista.filter(
                item => item.status === "NO_DATA"
            ).length,

        error:
            lista.filter(
                item => item.status === "ERROR"
            ).length
    };
}


/* ============================================================
 * API PÚBLICA
 * ============================================================ */

export {

    ANL_DEFINITIONS,

    criarAlvo,

    classificarResultado,

    executarANL,

    executarInvestigacao,

    obterDefinicoesANL,

    obterANL,

    obterResumo

};


/* ============================================================
 * COMPATIBILIDADE COM CÓDIGO ANTIGO
 * ============================================================
 *
 * Caso alguma parte antiga do site procure estas funções
 * diretamente no window, elas continuam disponíveis.
 * ============================================================ */

if (typeof window !== "undefined") {

    window.MATRIZ_ENGINE = {

        ANL_DEFINITIONS,

        criarAlvo,

        classificarResultado,

        executarANL,

        executarInvestigacao,

        obterDefinicoesANL,

        obterANL,

        obterResumo

    };

}
