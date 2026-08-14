/*
 * ANL-12 — SÍNTESE
 *
 * Última etapa da Matriz.
 *
 * Não cria evidências.
 * Integra as evidências produzidas pelas etapas anteriores.
 */

export async function runANL12(alvo, contexto = {}) {
    const etapas = [
        "ANL-01",
        "ANL-02",
        "ANL-03",
        "ANL-04",
        "ANL-05",
        "ANL-06",
        "ANL-07",
        "ANL-08",
        "ANL-09",
        "ANL-10",
        "ANL-11"
    ];

    const evidenciasDisponiveis = etapas.filter(
        id => contexto[id.toLowerCase().replace("-", "")] ||
              contexto[id.toLowerCase()]
    );

    return {
        id: "ANL-12",
        titulo: "SÍNTESE",
        status: "PENDING_SOURCE",

        entrada: {
            alvo: alvo || "",
            etapasAnteriores: etapas,
            evidenciasDisponiveis
        },

        fontes: [
            "Base de evidências validada"
        ],

        evidencias: [],

        sintese: {
            textoAfirma: null,
            textoImplica: null,
            interpretacao: null,
            inferencia: null,
            aplicacao: null,
            questoesDebatidas: [],
            grauDeSeguranca: null
        },

        pendencias: [
            "Receber evidências reais das etapas anteriores.",
            "Validar as evidências.",
            "Separar afirmação textual de interpretação.",
            "Separar inferência de aplicação.",
            "Calcular grau de segurança."
        ],

        observacao:
            "A síntese não será inventada enquanto a base de evidências não estiver disponível."
    };
}
