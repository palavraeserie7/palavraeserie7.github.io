const M00 = (function() {
    const _db = window.supabaseClientInstance;

    return {
        async execute(action, params = {}) {
            if (action === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
            if (action === 'QUERY_THEME') return this.generateUniversalExegesis(params.query);
            if (action === 'AUTH_GET_USER') { const {data} = await _db.auth.getUser(); return data.user; }
            if (action === 'LOAD_DASHBOARD') {
                const {data: books} = await _db.from('livros').select('*');
                return { profile: { level: 1, faith: 92, prayer: 88 }, books: books || [] };
            }
            return null;
        },

        generateUniversalExegesis(query) {
            const q = query.toUpperCase();
            const lib = this.getLibraryData();
            
            // MOTOR GERATIVO: Cria análise para QUALQUER palavra baseada nas 9 camadas
            return {
                tema: q,
                score: 15,
                status: "APROVADO",
                m03: {
                    titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)",
                    originais: `Análise de Originais para "${q}": Consulte a Camada 1 (Léxico) para identificar a raiz no Hebraico/Grego.`,
                    conteudo: `Para o tema "${q}", a exegese exige observar o contexto histórico-gramatical. Inicie pela Camada 3 para verificar como os principais comentaristas (NICNT/BECNT) tratam a ocorrência deste termo no arco canônico.`
                },
                m02: {
                    titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)",
                    conteudo: `A revelação central de "${q}" aponta para a soberania de Deus. A aplicação prática deve transformar o entendimento em vida, focando na centralidade de Cristo e na edificação da igreja conforme o fluxo de 7 etapas.`
                },
                camadas: lib.camadas
            };
        },

        getLibraryData() {
            return {
                camadas: [
                    { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [{ nome: "BDAG", resolve: "Significado grego NT" }, { nome: "HALOT", resolve: "Léxico hebraico AT" }] },
                    { id: 2, nome: "CAMADA 2 — LÉXICO TEOLÓGICO", recursos: [{ nome: "TDNT", resolve: "Dicionário teológico NT" }, { nome: "NIDNTTE", resolve: "Perspectiva evangélica" }] },
                    { id: 3, nome: "CAMADA 3 — EXEGÉTICOS (NT)", recursos: [{ nome: "NICNT", resolve: "Equilíbrio grego/pastoral" }, { nome: "BECNT", resolve: "Rigor exegético máximo" }] },
                    { id: 4, nome: "CAMADA 4 — EXEGÉTICOS (AT)", recursos: [{ nome: "NICOT", resolve: "Exegese séria AT" }, { nome: "Word Biblical", resolve: "Rigor acadêmico" }] },
                    { id: 5, nome: "CAMADA 5 — TEOLOGIA BÍBLICA", recursos: [{ nome: "G.K. Beale", resolve: "Unidade canônica" }, { nome: "Vos", resolve: "Fundamento histórico" }] },
                    { id: 6, nome: "CAMADA 6 — SISTEMÁTICA", recursos: [{ nome: "Grudem", resolve: "Referência doutrinária" }, { nome: "Berkhof", resolve: "Clássico reformado" }] },
                    { id: 7, nome: "CAMADA 7 — CONTEXTO HISTÓRICO", recursos: [{ nome: "Zondervan", resolve: "Arqueologia e cultura" }, { nome: "ANET", resolve: "Oriente Próximo" }] },
                    { id: 8, nome: "CAMADA 8 — HERMENÊUTICA", recursos: [{ nome: "Carson & Moo", resolve: "Introdução ao NT" }, { nome: "Osborne", resolve: "Espiral Hermenêutica" }] },
                    { id: 9, nome: "CAMADA 9 — FERRAMENTAS", recursos: [{ nome: "Logos", resolve: "Integração total" }, { nome: "Accordance", resolve: "Trabalho textual" }] }
                ]
            };
        }
    };
})();
window.M00 = M00;
