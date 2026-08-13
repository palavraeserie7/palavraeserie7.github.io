/**
 * PESQUISA MODULAR
 *
 * Sistema independente da Matriz de Análise Bíblica.
 *
 * NÃO depende de:
 * dashboard.js
 * orchestrator.js
 * research-router.js
 * research-stages.js
 *
 * Portanto, pode ser desenvolvido e testado sem alterar
 * o sistema existente.
 */

const ModularEngine = (() => {

    const depths = [

        {
            id: 1,
            name: "Visão",
            description: "Mapeamento inicial"
        },

        {
            id: 2,
            name: "Exploração",
            description: "Primeira camada de investigação"
        },

        {
            id: 3,
            name: "Análise",
            description: "Investigação dos elementos principais"
        },

        {
            id: 4,
            name: "Investigação",
            description: "Aprofundamento dos submódulos"
        },

        {
            id: 5,
            name: "Profundidade",
            description: "Investigação detalhada"
        },

        {
            id: 6,
            name: "Exaustiva",
            description: "Penetração máxima disponível"
        }

    ];


    const modules = [

        {
            id: "ANL-01",
            name: "Texto e Manuscritos",

            nodes: [

                "Identificação do texto-base",

                "Testemunhos textuais",

                "Papiros",

                "Unciais",

                "Minúsculos",

                "Variantes textuais",

                "Aparatos críticos",

                "Evidências externas",

                "Evidências internas",

                "Avaliação textual",

                "Conclusão textual"

            ]

        },


        {
            id: "ANL-02",
            name: "Tradução e Texto Original",

            nodes: [

                "Identificação do idioma original",

                "Texto hebraico / aramaico / grego",

                "Transliteração",

                "Tradução literal",

                "Tradução contextual",

                "Comparação de traduções",

                "Diferenças significativas",

                "Avaliação da tradução",

                "Conclusão"

            ]

        },


        {
            id: "ANL-03",
            name: "Gramática e Sintaxe",

            nodes: [

                "Identificação das palavras",

                "Lema",

                "Morfologia",

                "Classe gramatical",

                "Tempo verbal",

                "Voz",

                "Modo",

                "Função sintática",

                "Relações entre termos",

                "Estrutura da oração",

                "Conclusão gramatical"

            ]

        },


        {
            id: "ANL-04",
            name: "Palavras e Semântica",

            nodes: [

                "Identificação lexical",

                "Lema e forma",

                "Campo semântico",

                "Sentidos possíveis",

                "Sentido no contexto",

                "Uso pelo autor",

                "Uso no livro",

                "Uso no Testamento",

                "Uso no restante da Escritura",

                "Paralelos semânticos",

                "Conclusão semântica"

            ]

        },


        {
            id: "ANL-05",
            name: "Significado Teológico",

            nodes: [

                "Conceito teológico",

                "Atributos de Deus",

                "Relação com o ser humano",

                "Relação com pecado",

                "Relação com salvação",

                "Relação com santificação",

                "Desenvolvimento do conceito",

                "Conclusão teológica"

            ]

        },


        {
            id: "ANL-06",
            name: "Exegese e Contexto Literário",

            nodes: [

                "Delimitação da passagem",

                "Contexto imediato",

                "Estrutura literária",

                "Argumento do autor",

                "Personagens",

                "Repetições e contrastes",

                "Tema central",

                "Intenção comunicativa",

                "Conclusão exegética"

            ]

        },


        {
            id: "ANL-07",
            name: "Contexto Histórico, Cultural e Religioso",

            nodes: [

                "Datação",

                "Autor",

                "Destinatários",

                "Contexto histórico",

                "Costumes",

                "Instituições",

                "Práticas religiosas",

                "Contexto social",

                "Relação com a passagem",

                "Conclusão histórica"

            ]

        },


        {
            id: "ANL-08",
            name: "Contexto Geográfico e Político",

            nodes: [

                "Localização",

                "Região",

                "Cidades",

                "Territórios",

                "Fronteiras",

                "Estruturas políticas",

                "Autoridades",

                "Conflitos",

                "Influência geográfica",

                "Conclusão"

            ]

        },


        {
            id: "ANL-09",
            name: "Relação com o Restante da Escritura",

            nodes: [

                "Referências explícitas",

                "Citações",

                "Alusões",

                "Paralelos",

                "Temas relacionados",

                "Conceitos relacionados",

                "Antigo e Novo Testamento",

                "Desenvolvimento canônico",

                "Relações intertextuais",

                "Conclusão canônica"

            ]

        },


        {
            id: "ANL-10",
            name: "Hermenêutica e Controle",

            nodes: [

                "Observação",

                "Interpretação",

                "Pressupostos",

                "Possíveis leituras",

                "Ambiguidades",

                "Riscos interpretativos",

                "Coerência contextual",

                "Coerência canônica",

                "Controle hermenêutico",

                "Conclusão"

            ]

        },


        {
            id: "ANL-11",
            name: "Teologia e Comparação",

            nodes: [

                "Teologia bíblica",

                "Temas relacionados",

                "Autores bíblicos",

                "Comparação entre textos",

                "Convergências",

                "Divergências",

                "Interpretações históricas",

                "Posições teológicas",

                "Avaliação",

                "Conclusão"

            ]

        }

    ];


    function getDepths() {

        return depths;

    }


    function getModules() {

        return modules;

    }


    function getModule(id) {

        return modules.find(
            module => module.id === id
        );

    }


    function buildResearch(theme, passage, moduleId, depth) {

        const module = getModule(moduleId);

        if (!module) {

            throw new Error(
                "Módulo de pesquisa não encontrado."
            );

        }


        /*
         * A profundidade determina quantos elementos
         * da árvore serão apresentados.
         *
         * Futuramente isso poderá ser substituído
         * por um motor de pesquisa real.
         */

        let amount;

        switch (depth) {

            case 1:
                amount = 3;
                break;

            case 2:
                amount = 5;
                break;

            case 3:
                amount = 7;
                break;

            case 4:
                amount = 9;
                break;

            case 5:
                amount = 10;
                break;

            case 6:
                amount = module.nodes.length;
                break;

            default:
                amount = 3;

        }


        const selectedNodes =
            module.nodes.slice(0, amount);


        return {

            theme,
            passage,
            module,
            depth,

            nodes: selectedNodes.map(
                (node, index) => {

                    return {

                        id:
                            `${module.id}.${String(index + 1).padStart(2, "0")}`,

                        title: node,

                        subnodes:
                            buildSubnodes(
                                node,
                                depth
                            )

                    };

                }
            )

        };

    }


    function buildSubnodes(node, depth) {

        if (depth < 3) {

            return [];

        }


        return [

            "Pergunta de investigação",

            "Evidências necessárias",

            "Análise do elemento",

            "Relação com o contexto",

            "Conclusão do elemento"

        ].slice(
            0,
            Math.min(depth - 1, 5)
        );

    }


    return {

        getDepths,

        getModules,

        getModule,

        buildResearch

    };

})();
