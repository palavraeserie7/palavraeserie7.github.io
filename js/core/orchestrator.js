/**
 * PALAVRA & SÉRIE
 * M00 — CORE ORCHESTRATOR
 *
 * Arquitetura oficial da Pesquisa Bíblica
 *
 * PRINCÍPIO:
 * Nível de profundidade ≠ fonte.
 *
 * O usuário escolhe o nível.
 * O motor determina as etapas.
 * Cada etapa determina quais fontes podem ser utilizadas.
 *
 * A consulta real às fontes será integrada posteriormente.
 */

const M00 = (function () {

    const db = window.supabaseClientInstance || null;

    /* =========================================================
       1. ETAPAS CANÔNICAS DA PESQUISA PRO
       ========================================================= */

    const PRO_STAGES = [
        {
            id: 1,
            key: "texto",
            nome: "Texto Bíblico",
            descricao: "Estabelecimento do texto e da unidade analisada."
        },
        {
            id: 2,
            key: "critica_textual",
            nome: "Crítica Textual",
            descricao: "Avaliação das variantes e transmissão textual."
        },
        {
            id: 3,
            key: "gramatica_sintaxe",
            nome: "Gramática e Sintaxe",
            descricao: "Análise morfológica, sintática e estrutural."
        },
        {
            id: 4,
            key: "lexico_semantica",
            nome: "Léxico e Semântica",
            descricao: "Investigação dos termos, sentidos e usos."
        },
        {
            id: 5,
            key: "contexto_literario",
            nome: "Contexto Literário",
            descricao: "Função da passagem dentro do livro e da unidade."
        },
        {
            id: 6,
            key: "contexto_historico",
            nome: "Contexto Histórico-Cultural",
            descricao: "Ambiente histórico, social, cultural e religioso."
        },
        {
            id: 7,
            key: "intertextualidade",
            nome: "Intertextualidade e Relações Bíblicas",
            descricao: "Relações com outras passagens e temas bíblicos."
        },
        {
            id: 8,
            key: "exegese",
            nome: "Exegese",
            descricao: "Integração das evidências para determinar o sentido."
        },
        {
            id: 9,
            key: "teologia_biblica",
            nome: "Teologia Bíblica",
            descricao: "Relação da passagem com o desenvolvimento da revelação."
        },
        {
            id: 10,
            key: "hermeneutica",
            nome: "Hermenêutica e Controle",
            descricao: "Controle das interpretações e prevenção de erros."
        },
        {
            id: 11,
            key: "teologia_sistematica",
            nome: "Teologia Sistemática",
            descricao: "Relação com formulações doutrinárias."
        },
        {
            id: 12,
            key: "comparacao",
            nome: "Comparação e Validação",
            descricao: "Comparação das evidências, consenso e divergências."
        },
        {
            id: 13,
            key: "sintese",
            nome: "Síntese Final",
            descricao: "Conclusão fundamentada nas evidências reunidas."
        }
    ];


    /* =========================================================
       2. NÍVEIS DE PROFUNDIDADE
       ========================================================= */

    const RESEARCH_MODES = [

        {
            id: "rapida",
            numero: 1,
            nome: "Pesquisa Rápida",
            descricao: "Resposta direta e objetiva.",
            acesso: "free",
            etapas: [1, 5, 13]
        },

        {
            id: "contextual",
            numero: 2,
            nome: "Pesquisa Contextual",
            descricao: "Contexto literário, histórico e bíblico.",
            acesso: "free",
            etapas: [1, 5, 6, 7, 13]
        },

        {
            id: "exegetica",
            numero: 3,
            nome: "Pesquisa Exegética",
            descricao: "Originais, gramática, sintaxe, léxico e exegese.",
            acesso: "free",
            etapas: [1, 3, 4, 5, 8, 13]
        },

        {
            id: "profunda",
            numero: 4,
            nome: "Pesquisa Profunda",
            descricao: "Integração ampla das principais evidências bíblicas.",
            acesso: "free",
            etapas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13]
        },

        {
            id: "pro",
            numero: 5,
            nome: "Pesquisa PRO",
            descricao: "Investigação acadêmica completa em 13 etapas.",
            acesso: "pro",
            etapas: PRO_STAGES.map(stage => stage.id)
        }
    ];


    /* =========================================================
       3. MATRIZ INICIAL DE FONTES
       
       ATENÇÃO:
       Estes são MAPEAMENTOS.
       O sistema ainda NÃO afirma que consultou as obras.
       A consulta real será implementada posteriormente.
       ========================================================= */

    const SOURCE_MATRIX = {

        texto: [
            "NA28",
            "BHS/BHQ",
            "SBLGNT",
            "Septuaginta",
            "Textus Receptus/Scrivener"
        ],

        critica_textual: [
            "Metzger — The Text of the New Testament",
            "Metzger — The Early Versions of the New Testament",
            "Aparatos das edições críticas"
        ],

        gramatica_sintaxe: [
            "Gramáticas gregas",
            "Gramáticas hebraicas",
            "Sintaxe grega",
            "Sintaxe hebraica"
        ],

        lexico_semantica: [
            "BDAG",
            "HALOT",
            "LSJ",
            "BDB"
        ],

        contexto_literario: [
            "BECNT",
            "NIGTC",
            "NICNT",
            "Pillar",
            "WBC",
            "NICOT",
            "AOTC",
            "Baker OT"
        ],

        contexto_historico: [
            "Zondervan Encyclopedia",
            "IVP Background Commentary",
            "NBD",
            "ANET/COS",
            "Zondervan Atlas",
            "Manners and Customs"
        ],

        intertextualidade: [
            "Beale",
            "Beale & Carson",
            "Vos",
            "Goldsworthy",
            "Schreiner"
        ],

        exegese: [
            "BECNT",
            "NIGTC",
            "NICNT",
            "NICOT",
            "Pillar",
            "WBC"
        ],

        teologia_biblica: [
            "Beale",
            "Beale & Carson",
            "Vos",
            "Goldsworthy",
            "Schreiner"
        ],

        hermeneutica: [
            "Osborne",
            "Carson — Exegetical Fallacies",
            "Carson & Moo",
            "Dillard & Longman",
            "Fee & Stuart"
        ],

        teologia_sistematica: [
            "Grudem",
            "Berkhof",
            "Frame",
            "EDT"
        ],

        comparacao: [
            "Fontes das etapas anteriores"
        ],

        sintese: [
            "Evidências reunidas nas etapas anteriores"
        ]
    };


    /* =========================================================
       4. EXECUTOR PRINCIPAL
       ========================================================= */

    async function executeResearch(query, mode, user = null) {

        const selectedMode = RESEARCH_MODES.find(
            item => item.id === mode
        ) || RESEARCH_MODES[1];

        const isPro = checkProAccess(user);

        if (selectedMode.acesso === "pro" && !isPro) {

            return {
                autorizado: false,
                bloqueado: true,
                modo: selectedMode,
                mensagem:
                    "A Pesquisa PRO exige acesso PRO.",
                cta:
                    "Acessar Pesquisa PRO"
            };
        }


        const stages = selectedMode.etapas
            .map(id => PRO_STAGES.find(stage => stage.id === id))
            .filter(Boolean);


        const fontesPlanejadas = [];

        stages.forEach(stage => {

            const sources =
                SOURCE_MATRIX[stage.key] || [];

            fontesPlanejadas.push({
                etapa: stage.nome,
                fontes: sources
            });

        });


        return {

            autorizado: true,

            bloqueado: false,

            tema: query || "Pesquisa bíblica",

            modo: selectedMode,

            etapas: stages,

            fontesPlanejadas,

            status: "ARQUITETURA_PRONTA",

            mensagem:
                "A pesquisa foi estruturada de acordo com o nível de profundidade selecionado.",

            avisoFontes:
                "As fontes apresentadas representam a infraestrutura documental prevista. A consulta automática aos documentos será ativada na integração do motor documental.",

            m03: {
                titulo: "M03 — ENTENDIMENTO BÍBLICO",
                conteudo:
                    "O sistema estruturou a investigação conforme o nível de profundidade escolhido."
            },

            m02: {
                titulo: "M02 — MENSAGEM",
                conteudo:
                    "A síntese final será produzida somente após a análise das evidências correspondentes às etapas ativadas."
            }
        };
    }


    /* =========================================================
       5. VERIFICAÇÃO DE ACESSO
       ========================================================= */

    function checkProAccess(user) {

        if (!user) return false;

        const metadata =
            user.user_metadata || {};

        const appMetadata =
            user.app_metadata || {};

        const plan =
            metadata.plan ||
            metadata.plano ||
            appMetadata.plan ||
            appMetadata.plano ||
            "free";

        return String(plan).toLowerCase() === "pro";
    }


    /* =========================================================
       6. FLUXO DE UM NÍVEL
       ========================================================= */

    function getModeFlow(mode) {

        const selected =
            RESEARCH_MODES.find(
                item => item.id === mode
            );

        if (!selected) return [];

        return selected.etapas
            .map(id =>
                PRO_STAGES.find(stage => stage.id === id)
            )
            .filter(Boolean);
    }


    /* =========================================================
       7. API PÚBLICA
       ========================================================= */

    return {

        async execute(action, params = {}) {

            switch (action) {

                case "GET_RESEARCH_MODES":
                    return RESEARCH_MODES;

                case "GET_PRO_STAGES":
                    return PRO_STAGES;

                case "GET_MODE_FLOW":
                    return getModeFlow(params.mode);

                case "GET_SOURCE_MATRIX":
                    return SOURCE_MATRIX;

                case "EXECUTE_RESEARCH":
                    return executeResearch(
                        params.query,
                        params.mode,
                        params.user
                    );

                case "AUTH_GET_USER":

                    if (!db) return null;

                    const {
                        data,
                        error
                    } = await db.auth.getUser();

                    if (error) {
                        console.error(
                            "Erro de autenticação:",
                            error
                        );
                        return null;
                    }

                    return data.user;

                case "LOAD_DASHBOARD":

                    if (!db) {
                        return {
                            books: []
                        };
                    }

                    const {
                        data: books,
                        error: booksError
                    } = await db
                        .from("livros")
                        .select("*");

                    if (booksError) {
                        console.error(
                            "Erro ao carregar livros:",
                            booksError
                        );
                    }

                    return {
                        books: books || []
                    };

                default:
                    console.warn(
                        "Ação M00 desconhecida:",
                        action
                    );

                    return null;
            }
        },

        getResearchModes() {
            return RESEARCH_MODES;
        },

        getProStages() {
            return PRO_STAGES;
        },

        getSourceMatrix() {
            return SOURCE_MATRIX;
        },

        getModeFlow(mode) {
            return getModeFlow(mode);
        },

        hasProAccess(user) {
            return checkProAccess(user);
        }
    };

})();

window.M00 = M00;
