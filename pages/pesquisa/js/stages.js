(function () {

    const STAGES = [

        {
            id: "ANL-01",
            title: "TEXTO E MANUSCRITOS",
            status: "PRINCIPAL",
            submodules: [
                "Identificação do texto-base",
                "Testemunhos textuais",
                "Variantes textuais",
                "Crítica textual",
                "Aparatos críticos"
            ]
        },

        {
            id: "ANL-02",
            title: "TRADUÇÃO E TEXTO ORIGINAL",
            status: "PRINCIPAL",
            submodules: [
                "Texto hebraico",
                "Texto aramaico",
                "Texto grego",
                "Tradução literal",
                "Comparação de traduções"
            ]
        },

        {
            id: "ANL-03",
            title: "GRAMÁTICA E SINTAXE",
            status: "PRINCIPAL",
            submodules: [
                "Morfologia",
                "Classe gramatical",
                "Forma verbal",
                "Sintaxe",
                "Relação entre termos"
            ]
        },

        {
            id: "ANL-04",
            title: "PALAVRAS E SEMÂNTICA",
            status: "PRINCIPAL",
            submodules: [
                "Termo principal",
                "Campo semântico",
                "Uso no contexto",
                "Ocorrências bíblicas",
                "Sentido contextual"
            ]
        },

        {
            id: "ANL-05",
            title: "SIGNIFICADO TEOLÓGICO",
            status: "RELEVANTE",
            submodules: [
                "Conceito teológico",
                "Afirmação do texto",
                "Atributos de Deus",
                "Relação com Cristo",
                "Implicações teológicas"
            ]
        },

        {
            id: "ANL-06",
            title: "EXEGESE E CONTEXTO LITERÁRIO",
            status: "PRINCIPAL",
            submodules: [
                "Unidade literária",
                "Contexto imediato",
                "Estrutura do texto",
                "Argumentação",
                "Intenção comunicativa"
            ]
        },

        {
            id: "ANL-07",
            title: "CONTEXTO HISTÓRICO, CULTURAL E RELIGIOSO",
            status: "RELEVANTE",
            submodules: [
                "Contexto histórico",
                "Costumes",
                "Instituições",
                "Práticas religiosas",
                "Ambiente cultural"
            ]
        },

        {
            id: "ANL-08",
            title: "CONTEXTO GEOGRÁFICO E POLÍTICO",
            status: "CONDICIONAL",
            submodules: [
                "Localização",
                "Geografia",
                "Povos envolvidos",
                "Estrutura política",
                "Influência geográfica"
            ]
        },

        {
            id: "ANL-09",
            title: "RELAÇÃO COM O RESTANTE DA ESCRITURA",
            status: "RELEVANTE",
            submodules: [
                "Referências internas",
                "Paralelos",
                "Citações",
                "Alusões",
                "Desenvolvimento canônico"
            ]
        },

        {
            id: "ANL-10",
            title: "HERMENÊUTICA E CONTROLE",
            status: "RELEVANTE",
            submodules: [
                "Princípio interpretativo",
                "Limites da interpretação",
                "Contexto versus aplicação",
                "Possíveis erros",
                "Controle da conclusão"
            ]
        },

        {
            id: "ANL-11",
            title: "TEOLOGIA E COMPARAÇÃO",
            status: "RELEVANTE",
            submodules: [
                "Teologia bíblica",
                "Teologia sistemática",
                "Comparação de textos",
                "Convergências",
                "Divergências interpretativas"
            ]
        },

        {
            id: "ANL-12",
            title: "SÍNTESE",
            status: "PRINCIPAL",
            submodules: [
                "Dados encontrados",
                "Evidências principais",
                "Conclusão exegética",
                "Síntese teológica",
                "Aplicação controlada"
            ]
        }

    ];

    window.BiblicalResearchStages = STAGES;

})();
