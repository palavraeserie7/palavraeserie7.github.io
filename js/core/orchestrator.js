const M00 = {
    async execute(engine, params = {}) {
        if (engine === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
        if (engine === 'SENTINELA') return await this.universalSearch(params.query);
        if (engine === 'PRO') {
            const { data } = await supabase.from('livros').select('*');
            return data || [];
        }
        return {};
    },

    async universalSearch(query) {
        const results = [];
        const { data: dbResults } = await supabase.from('palavras').select('*').ilike('content', `%${query}%`);
        if (dbResults) dbResults.forEach(item => results.push({ type: 'content', title: 'Insight', text: item.content, sentinel: 10 }));
        
        const lib = this.getLibraryData();
        lib.camadas.forEach(c => {
            c.recursos.forEach(r => {
                if (r.nome.toLowerCase().includes(query.toLowerCase()) || r.resolve.toLowerCase().includes(query.toLowerCase())) {
                    results.push({ type: 'resource', title: r.nome, text: r.resolve, camada: c.nome, nivel: r.nivel, sentinel: 5 });
                }
            });
        });
        return results;
    },

    getLibraryData() {
        return {
            camadas: [
                { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", sub: "Significado exato das palavras originais", recursos: [
                    { nome: "BDAG", resolve: "Significado grego NT. Essencial para Santidade e Amor.", nivel: "ESSENCIAL" },
                    { nome: "HALOT", resolve: "Léxico hebraico/aramaico AT.", nivel: "ESSENCIAL" },
                    { nome: "LSJ", resolve: "Grego clássico pré-NT.", nivel: "ALTO" }
                ]},
                { id: 2, nome: "CAMADA 2 — LÉXICO TEOLÓGICO", sub: "História da redenção no pensamento bíblico", recursos: [
                    { nome: "TDNT (Kittel)", resolve: "Dicionário teológico do NT (10 vols).", nivel: "MUITO ALTO" },
                    { nome: "TDOT", resolve: "Dicionário teológico do AT (17 vols).", nivel: "MUITO ALTO" },
                    { nome: "NIDNTTE", resolve: "Perspectiva evangélica de palavras gregas.", nivel: "ESSENCIAL+" }
                ]},
                { id: 3, nome: "CAMADA 3 — COMENTÁRIOS EXEGÉTICOS (NT)", sub: "Análise versículo a versículo no grego", recursos: [
                    { nome: "NICNT", resolve: "Equilíbrio entre grego e pastoral.", nivel: "ALTO" },
                    { nome: "BECNT", resolve: "Rigor exegético máximo.", nivel: "MUITO ALTO" },
                    { nome: "NIGTC", resolve: "Nível de doutorado.", nivel: "MUITO ALTO" }
                ]},
                { id: 4, nome: "CAMADA 4 — COMENTÁRIOS EXEGÉTICOS (AT)", sub: "Análise rigorosa do texto hebraico", recursos: [
                    { nome: "NICOT", resolve: "Exegese séria do AT.", nivel: "ALTO" },
                    { nome: "BCOTWP", resolve: "Pentateuco, sabedoria e poesia.", nivel: "ALTO" },
                    { nome: "Word Biblical", resolve: "Rigor acadêmico máximo.", nivel: "MUITO ALTO" }
                ]},
                { id: 5, nome: "CAMADA 5 — TEOLOGIA BÍBLICA", sub: "A Escritura como história unificada", recursos: [
                    { nome: "G.K. Beale", resolve: "Unidade canônica da Escritura.", nivel: "ESSENCIAL+" },
                    { nome: "Carson & Beale", resolve: "Citações do AT no NT.", nivel: "ESSENCIAL+" },
                    { nome: "Geerhardus Vos", resolve: "Fundamento histórico-redentor.", nivel: "ALTO" }
                ]},
                { id: 6, nome: "CAMADA 6 — TEOLOGIA SISTEMÁTICA", sub: "Doutrina organizada com rigor", recursos: [
                    { nome: "Wayne Grudem", resolve: "Padrão em seminários. Santidade e Doutrina.", nivel: "ESSENCIAL+" },
                    { nome: "Louis Berkhof", resolve: "Clássico reformado histórico.", nivel: "ALTO" },
                    { nome: "John Frame", resolve: "Perspectiva pressuposicionalista.", nivel: "ALTO" }
                ]},
                { id: 7, nome: "CAMADA 7 — CONTEXTO HISTÓRICO", sub: "O mundo por trás do texto", recursos: [
                    { nome: "Zondervan Enc.", resolve: "Arqueologia e cultura bíblica.", nivel: "ALTO" },
                    { nome: "Keener (IVP)", resolve: "Contexto sociocultural NT.", nivel: "ALTO" },
                    { nome: "ANET/COS", resolve: "Oriente Próximo Antigo.", nivel: "MUITO ALTO" }
                ]},
                { id: 8, nome: "CAMADA 8 — HERMENÊUTICA", sub: "Como ler a Bíblia corretamente", recursos: [
                    { nome: "Carson & Moo", resolve: "Introdução ao NT.", nivel: "ALTO" },
                    { nome: "Grant Osborne", resolve: "Espiral Hermenêutica.", nivel: "ALTO" },
                    { nome: "D.A. Carson", resolve: "Falácias Exegéticas.", nivel: "ALTO" }
                ]},
                { id: 9, nome: "CAMADA 9 — FERRAMENTAS DIGITAIS", sub: "Plataformas de integração", recursos: [
                    { nome: "Logos Software", resolve: "Integração total de recursos.", nivel: "FERRAMENTA" },
                    { nome: "Accordance", resolve: "Trabalho textual avançado.", nivel: "FERRAMENTA" },
                    { nome: "ESV Study Bible", resolve: "Visão panorâmica confiável.", nivel: "MÉDIO-ALTO" }
                ]}
            ],
            fluxo: [
                "Identificar palavras-chave (BDAG/HALOT)",
                "Aprofundar teologia (NIDNTTE/NIDOTTE)",
                "Analisar contexto (BECNT/NICNT)",
                "Arco canônico (Beale)",
                "Contexto histórico (Zondervan)",
                "Validar doutrina (Grudem)",
                "Síntese Pessoal"
            ]
        };
    }
};
window.M00 = M00;
