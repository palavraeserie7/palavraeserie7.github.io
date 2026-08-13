export const MODULOS = [

    {
        id: "ANL-01",
        nome: "Texto e Manuscritos",

        condicao: d => {

            if (d.testamento === "Novo Testamento") {
                return 1.00;
            }

            if (d.testamento === "Antigo Testamento") {
                return 1.00;
            }

            return 0.40;
        },

        criterios: d => {

            const lista = [];

            if (d.recursos.textoGrego)
                lista.push("Texto grego");

            if (d.recursos.textoHebraico)
                lista.push("Texto hebraico");

            if (d.recursos.manuscritos)
                lista.push("Manuscritos");

            if (d.recursos.criticaTextual)
                lista.push("Crítica textual");

            if (d.recursos.na28)
                lista.push("NA28");

            if (d.recursos.bhs)
                lista.push("BHS");

            if (d.recursos.bhq)
                lista.push("BHQ");

            if (d.recursos.sblgnt)
                lista.push("SBLGNT");

            if (d.recursos.septuaginta)
                lista.push("Septuaginta");

            return lista;
        }
    },

    {
        id: "ANL-02",
        nome: "Tradução e Texto Original",
        condicao: () => 0.95,
        criterios: () => [
            "Texto original",
            "Tradução literal",
            "Tradução funcional"
        ]
    },

    {
        id: "ANL-03",
        nome: "Gramática e Sintaxe",
        condicao: () => 1.00,
        criterios: () => [
            "Morfologia",
            "Sintaxe",
            "Função das palavras",
            "Estrutura da frase"
        ]
    },

    {
        id: "ANL-04",
        nome: "Palavras e Semântica",
        condicao: () => 1.00,
        criterios: () => [
            "Léxico",
            "Campo semântico",
            "Uso contextual",
            "Sentido lexical"
        ]
    },

    {
        id: "ANL-05",
        nome: "Significado Teológico",
        condicao: () => 0.90,
        criterios: () => [
            "Conceitos teológicos",
            "Cristologia",
            "Teologia bíblica",
            "Relações doutrinárias"
        ]
    },

    {
        id: "ANL-06",
        nome: "Exegese e Contexto Literário",
        condicao: () => 0.95,
        criterios: () => [
            "Contexto imediato",
            "Estrutura literária",
            "Argumentação",
            "Gênero literário"
        ]
    },

    {
        id: "ANL-07",
        nome: "Contexto Histórico, Cultural e Religioso",
        condicao: () => 0.65,
        criterios: () => [
            "Contexto histórico",
            "Cultura",
            "Religião",
            "Costumes"
        ]
    },

    {
        id: "ANL-08",
        nome: "Contexto Geográfico e Político",
        condicao: d => {

            if (
                d.passagem.toLowerCase().includes("jerusalém") ||
                d.passagem.toLowerCase().includes("jerusalem") ||
                d.passagem.toLowerCase().includes("roma") ||
                d.passagem.toLowerCase().includes("galileia")
            ) {
                return 0.75;
            }

            return 0.25;
        },

        criterios: () => [
            "Geografia",
            "Território",
            "Contexto político"
        ]
    },

    {
        id: "ANL-09",
        nome: "Relação com o Restante da Escritura",
        condicao: () => 0.90,
        criterios: () => [
            "Citações",
            "Alusões",
            "Paralelos",
            "Intertextualidade"
        ]
    },

    {
        id: "ANL-10",
        nome: "Hermenêutica e Controle",
        condicao: () => 0.85,
        criterios: () => [
            "Controle contextual",
            "Controle linguístico",
            "Controle interpretativo"
        ]
    },

    {
        id: "ANL-11",
        nome: "Teologia e Comparação",
        condicao: () => 0.75,
        criterios: () => [
            "Teologia bíblica",
            "Comparação de interpretações",
            "Coerência doutrinária"
        ]
    },

    {
        id: "ANL-12",
        nome: "Síntese",
        condicao: () => 1.00,
        criterios: () => [
            "Conclusões",
            "Evidências",
            "Grau de confiança",
            "Síntese exegética"
        ]
    }
];
