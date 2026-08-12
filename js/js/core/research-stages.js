/**
 * PALAVRA & SÉRIE
 * RESEARCH STAGES
 *
 * Define as etapas disponíveis no motor de pesquisa.
 *
 * IMPORTANTE:
 * As etapas são internas.
 * O usuário escolhe apenas o nível de profundidade.
 */

window.PS_RESEARCH_STAGES = [

    {
        id: "texto",
        numero: 1,
        nome: "Texto",
        descricao: "Estabelecimento e observação do texto bíblico.",
        areas: ["texto", "tradução", "passagem"]
    },

    {
        id: "critica-textual",
        numero: 2,
        nome: "Crítica Textual",
        descricao: "Avaliação das variantes e da transmissão textual.",
        areas: ["manuscritos", "variantes", "texto original"]
    },

    {
        id: "gramatica-sintaxe",
        numero: 3,
        nome: "Gramática e Sintaxe",
        descricao: "Análise gramatical e estrutural do texto.",
        areas: ["gramática", "morfologia", "sintaxe"]
    },

    {
        id: "lexico",
        numero: 4,
        nome: "Léxico",
        descricao: "Investigação dos termos e seus campos semânticos.",
        areas: ["palavras", "significado", "hebraico", "grego"]
    },

    {
        id: "contexto-literario",
        numero: 5,
        nome: "Contexto Literário",
        descricao: "Relação da passagem com seu contexto imediato e com o livro.",
        areas: ["contexto", "estrutura", "gênero literário"]
    },

    {
        id: "historico-cultural",
        numero: 6,
        nome: "Contexto Histórico-Cultural",
        descricao: "Investigação do ambiente histórico e cultural.",
        areas: ["história", "cultura", "costumes", "geografia"]
    },

    {
        id: "intertextualidade",
        numero: 7,
        nome: "Intertextualidade",
        descricao: "Relações da passagem com outras partes das Escrituras.",
        areas: ["referências", "citações", "alusões", "AT", "NT"]
    },

    {
        id: "exegese",
        numero: 8,
        nome: "Exegese",
        descricao: "Integração das evidências para compreender o sentido da passagem.",
        areas: ["interpretação", "comentários", "argumentação"]
    },

    {
        id: "teologia-biblica",
        numero: 9,
        nome: "Teologia Bíblica",
        descricao: "Relação da passagem com o desenvolvimento da revelação bíblica.",
        areas: ["temas", "aliança", "Cristo", "revelação"]
    },

    {
        id: "hermeneutica",
        numero: 10,
        nome: "Hermenêutica",
        descricao: "Controle dos princípios utilizados na interpretação.",
        areas: ["método", "interpretação", "falácias"]
    },

    {
        id: "teologia-sistematica",
        numero: 11,
        nome: "Teologia Sistemática",
        descricao: "Relação das conclusões com a doutrina cristã.",
        areas: ["doutrina", "teologia", "confissões"]
    },

    {
        id: "comparacao",
        numero: 12,
        nome: "Comparação",
        descricao: "Comparação entre fontes, interpretações, consensos e divergências.",
        areas: ["fontes", "divergências", "consenso"]
    },

    {
        id: "sintese",
        numero: 13,
        nome: "Síntese",
        descricao: "Conclusão final baseada nas evidências coletadas.",
        areas: ["conclusão", "síntese", "evidências"]
    }

];
