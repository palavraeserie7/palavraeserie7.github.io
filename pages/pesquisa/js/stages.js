/**
 * STAGES.JS
 * Contrato oficial da Matriz de Pesquisa Bíblica.
 *
 * Este arquivo NÃO executa pesquisa.
 * Ele descreve a arquitetura dos módulos.
 */

export const STAGES = [
    {
        id: "ANL-01",
        nome: "Texto e Manuscritos",
        finalidade: "Estabelecer o texto-base e os testemunhos textuais pertinentes.",
        nivel: "fundamental",
        submodulos: [
            "identificacao-do-texto",
            "testemunhos-textuais",
            "variantes",
            "texto-critico"
        ]
    },
    {
        id: "ANL-02",
        nome: "Tradução e Texto Original",
        finalidade: "Examinar idiomas originais e comparar traduções.",
        nivel: "fundamental",
        submodulos: [
            "idioma-original",
            "traducoes",
            "comparacao-de-traducoes",
            "equivalencias"
        ]
    },
    {
        id: "ANL-03",
        nome: "Gramática e Sintaxe",
        finalidade: "Examinar forma, morfologia, sintaxe e relações gramaticais.",
        nivel: "profundo",
        submodulos: [
            "morfologia",
            "sintaxe",
            "estrutura-da-frase",
            "relacoes-gramaticais"
        ]
    },
    {
        id: "ANL-04",
        nome: "Palavras e Semântica",
        finalidade: "Investigar palavras-chave, lemas, campo semântico e sentido contextual.",
        nivel: "profundo",
        submodulos: [
            "palavra-chave",
            "lema",
            "forma-lexical",
            "campo-semantico",
            "sentido-contextual",
            "ocorrencias"
        ]
    },
    {
        id: "ANL-05",
        nome: "Significado Teológico",
        finalidade: "Investigar o significado teológico do texto ou conceito.",
        nivel: "profundo",
        submodulos: [
            "conceito",
            "desenvolvimento-teologico",
            "terminologia-teologica",
            "implicacoes"
        ]
    },
    {
        id: "ANL-06",
        nome: "Exegese e Contexto Literário",
        finalidade: "Interpretar o texto dentro de sua unidade literária.",
        nivel: "profundo",
        submodulos: [
            "contexto-imediato",
            "estrutura-literaria",
            "argumento",
            "intencao-do-autor",
            "unidade-literaria"
        ]
    },
    {
        id: "ANL-07",
        nome: "Contexto Histórico, Cultural e Religioso",
        finalidade: "Investigar o ambiente histórico-cultural pertinente.",
        nivel: "profundo",
        submodulos: [
            "contexto-historico",
            "costumes",
            "religiao",
            "instituicoes",
            "contexto-social"
        ]
    },
    {
        id: "ANL-08",
        nome: "Contexto Geográfico e Político",
        finalidade: "Investigar aspectos geográficos e políticos quando forem relevantes.",
        nivel: "condicional",
        submodulos: [
            "localizacao",
            "territorio",
            "autoridades",
            "conflitos-politicos",
            "rotas-e-regioes"
        ]
    },
    {
        id: "ANL-09",
        nome: "Relação com o Restante da Escritura",
        finalidade: "Investigar relações intrabíblicas e intertextuais.",
        nivel: "relevante",
        submodulos: [
            "citacoes",
            "alusoes",
            "temas",
            "paralelos",
            "desenvolvimento-canonico"
        ]
    },
    {
        id: "ANL-10",
        nome: "Hermenêutica e Controle",
        finalidade: "Controlar interpretações indevidas e distinguir evidência de inferência.",
        nivel: "controle",
        submodulos: [
            "contexto",
            "falacias",
            "pressuposicoes",
            "distincao-evidencia-inferencia",
            "limites-interpretativos"
        ]
    },
    {
        id: "ANL-11",
        nome: "Teologia e Comparação",
        finalidade: "Comparar interpretações e identificar consenso e divergência.",
        nivel: "avancado",
        submodulos: [
            "interpretacoes",
            "consensos",
            "divergencias",
            "posicoes-teologicas",
            "avaliacao-comparativa"
        ]
    },
    {
        id: "ANL-12",
        nome: "Síntese",
        finalidade: "Consolidar os resultados sem apagar divergências ou incertezas.",
        nivel: "final",
        submodulos: [
            "evidencias",
            "conclusoes",
            "incertezas",
            "divergencias",
            "sintese-final"
        ]
    }
];

export function getStage(id) {
    return STAGES.find(stage => stage.id === id) || null;
}
