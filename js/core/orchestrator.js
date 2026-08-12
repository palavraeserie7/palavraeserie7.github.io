/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA V7 - VERSÃO GERATIVA)
 * Motor de Inteligência Teológica que gera relatórios para QUALQUER tema.
 */
const M00 = {
    async execute(engine, params = {}) {
        if (engine === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
        if (engine === 'SENTINELA') return await this.generateAutomaticDossier(params.query);
        if (engine === 'PRO') {
            const { data } = await supabase.from('livros').select('*');
            return data || [];
        }
        return {};
    },

    async generateAutomaticDossier(query) {
        const { data: insights } = await supabase.from('palavras').select('*').ilike('content', `%${query}%`);
        const lib = this.getLibraryData();
        
        let parecer = `A análise teológica do tema "${query}" exige um percurso rigoroso através das 9 camadas acadêmicas. `;
        if (insights && insights.length > 0) {
            parecer += `Nossa base de dados registra: "${insights[0].content}". `;
        } else {
            parecer += `Este é um tema fundamental que deve ser abordado partindo da exegese dos originais (Hebraico/Grego) para evitar interpretações superficiais. `;
        }
        parecer += `Dentro da estrutura Palavra & Série V7, o pastor deve iniciar pela Camada 1 (Léxico) para definir o campo semântico de "${query}", avançar para a Camada 3 (Comentários) e consolidar na Camada 6 (Sistemática).`;

        const dossier = {
            tema: query.toUpperCase(),
            data: new Date().toLocaleDateString(),
            sentinel_score: 98,
            parecer_sentinela: parecer,
            originais_sugeridos: this.suggestOriginals(query),
            roteiro_estudo: []
        };

        lib.camadas.forEach(c => {
            dossier.roteiro_estudo.push({
                camada: c.nome,
                instrucao: `Como estudar "${query}" nesta etapa:`,
                ferramentas: c.recursos.slice(0, 2)
            });
        });
        return dossier;
    },

    suggestOriginals(query) {
        const common = {
            'amor': 'Grego: agape (ἀγάπη). Hebraico: ahavah (אַהֲבָה)',
            'graça': 'Grego: charis (χάρις). Hebraico: chen (חֵן)',
            'fé': 'Grego: pistis (πίστιס). Hebraico: emunah (אֱמוّנָה)'
        };
        return common[query.toLowerCase()] || `Consulte BDAG ou HALOT para o original de "${query}".`;
    },

    getLibraryData() {
        return {
            camadas: [
                { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [{ nome: "BDAG", resolve: "Grego NT", nivel: "ESSENCIAL" }, { nome: "HALOT", resolve: "Hebraico AT", nivel: "ESSENCIAL" }] },
                { id: 2, nome: "CAMADA 2 — LÉXICO TEOLÓGICO", recursos: [{ nome: "TDNT", resolve: "História Redenção", nivel: "MUITO ALTO" }, { nome: "NIDNTTE", resolve: "Evangélica", nivel: "ESSENCIAL+" }] },
                { id: 3, nome: "CAMADA 3 — EXEGÉTICOS (NT)", recursos: [{ nome: "NICNT", resolve: "Equilíbrio", nivel: "ALTO" }, { nome: "BECNT", resolve: "Rigor", nivel: "MUITO ALTO" }] },
                { id: 4, nome: "CAMADA 4 — EXEGÉTICOS (AT)", recursos: [{ nome: "NICOT", resolve: "Séria", nivel: "ALTO" }, { nome: "Word", resolve: "Acadêmico", nivel: "MUITO ALTO" }] },
                { id: 5, nome: "CAMADA 5 — TEOLOGIA BÍBLICA", recursos: [{ nome: "Beale", resolve: "Unidade", nivel: "ESSENCIAL+" }, { nome: "Vos", resolve: "Fundamento", nivel: "ALTO" }] },
                { id: 6, nome: "CAMADA 6 — SISTEMÁTICA", recursos: [{ nome: "Grudem", resolve: "Padrão", nivel: "ESSENCIAL+" }, { nome: "Berkhof", resolve: "Reformado", nivel: "ALTO" }] },
                { id: 7, nome: "CAMADA 7 — CONTEXTO", recursos: [{ nome: "Zondervan", resolve: "Arqueologia", nivel: "ALTO" }, { nome: "ANET", resolve: "Textos ANE", nivel: "MUITO ALTO" }] },
                { id: 8, nome: "CAMADA 8 — HERMENÊUTICA", recursos: [{ nome: "Carson", resolve: "Introdução", nivel: "ALTO" }, { nome: "Osborne", resolve: "Espiral", nivel: "ALTO" }] },
                { id: 9, nome: "CAMADA 9 — FERRAMENTAS", recursos: [{ nome: "Logos", resolve: "Integração", nivel: "FERRAMENTA" }, { nome: "Accordance", resolve: "Textual", nivel: "FERRAMENTA" }] }
            ]
        };
    }
};
window.M00 = M00;
