/**
 * PALAVRA & SÉRIE
 * RESEARCH MODES
 *
 * Níveis apresentados ao usuário.
 *
 * As 13 etapas ficam escondidas no motor.
 */

window.PS_RESEARCH_MODES = [

    {
        id: "rapida",

        nome: "Pesquisa Rápida",

        descricao:
            "Resposta objetiva para perguntas simples sobre a Bíblia.",

        acesso: "free",

        etapas: [
            "texto",
            "contexto-literario",
            "sintese"
        ]
    },

    {
        id: "contextual",

        nome: "Pesquisa Contextual",

        descricao:
            "Amplia a pesquisa com contexto literário e histórico-cultural.",

        acesso: "free",

        etapas: [
            "texto",
            "contexto-literario",
            "historico-cultural",
            "intertextualidade",
            "sintese"
        ]
    },

    {
        id: "exegetica",

        nome: "Pesquisa Exegética",

        descricao:
            "Investiga o texto, os idiomas bíblicos, gramática, léxico e exegese.",

        acesso: "free",

        etapas: [
            "texto",
            "gramatica-sintaxe",
            "lexico",
            "contexto-literario",
            "exegese",
            "sintese"
        ]
    },

    {
        id: "profunda",

        nome: "Pesquisa Profunda",

        descricao:
            "Integra diversas áreas da pesquisa bíblica para uma análise mais ampla.",

        acesso: "free",

        etapas: [
            "texto",
            "gramatica-sintaxe",
            "lexico",
            "contexto-literario",
            "historico-cultural",
            "intertextualidade",
            "exegese",
            "teologia-biblica",
            "hermeneutica",
            "sintese"
        ]
    },

    {
        id: "pro",

        nome: "Pesquisa PRO",

        descricao:
            "Investigação acadêmica completa em todas as etapas disponíveis.",

        acesso: "pro",

        etapas: [
            "texto",
            "critica-textual",
            "gramatica-sintaxe",
            "lexico",
            "contexto-literario",
            "historico-cultural",
            "intertextualidade",
            "exegese",
            "teologia-biblica",
            "hermeneutica",
            "teologia-sistematica",
            "comparacao",
            "sintese"
        ]
    }

];
