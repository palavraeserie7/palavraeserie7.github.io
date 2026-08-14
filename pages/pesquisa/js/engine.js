/**
 * ENGINE.JS
 *
 * Motor de execução.
 *
 * IMPORTANTE:
 * Nenhuma chave secreta é armazenada neste arquivo.
 *
 * A análise de IA deve ser realizada por um backend seguro.
 */

const CONFIG = {
    endpoint: "/api/research"
};

export async function executarANL(
    moduloId,
    nomeModulo,
    fontes,
    promptEspecifico,
    contexto = {}
) {

    const payload = {
        modulo: {
            id: moduloId,
            nome: nomeModulo
        },

        entrada: contexto.entrada || null,

        fontesDeclaradas: Array.isArray(fontes)
            ? fontes
            : [],

        instrucao: promptEspecifico,

        modo: contexto.modo || "pesquisa"
    };

    try {

        const resposta = await fetch(CONFIG.endpoint, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)
        });

        if (!resposta.ok) {

            throw new Error(
                `Servidor de pesquisa respondeu HTTP ${resposta.status}.`
            );
        }

        const dados = await resposta.json();

        return normalizarResultado(
            moduloId,
            fontes,
            dados
        );

    } catch (erro) {

        return {
            status: "BACKEND_UNDISPONIVEL",

            modulo: moduloId,

            confianca: "INDETERMINADA",

            resultado:
                "A pesquisa não foi executada porque o motor seguro de pesquisa não está disponível.",

            fontesDeclaradas: fontes || [],

            fontesUtilizadas: [],

            evidencias: [],

            avisos: [
                erro.message
            ],

            review_required: true
        };
    }
}


function normalizarResultado(
    moduloId,
    fontesDeclaradas,
    dados
) {

    return {

        status: dados.status || "COMPLETED",

        modulo: moduloId,

        confianca:
            dados.confianca || "INDETERMINADA",

        resultado:
            dados.resultado || "",

        fontesDeclaradas,

        fontesUtilizadas:
            Array.isArray(dados.fontesUtilizadas)
                ? dados.fontesUtilizadas
                : [],

        evidencias:
            Array.isArray(dados.evidencias)
                ? dados.evidencias
                : [],

        avisos:
            Array.isArray(dados.avisos)
                ? dados.avisos
                : [],

        review_required:
            Boolean(dados.review_required)
    };
}
