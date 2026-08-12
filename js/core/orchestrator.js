/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA V7)
 * Biblioteca Bíblica Avançada - TODAS AS 9 CAMADAS COMPLETAS
 */
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
        if (dbResults) {
            dbResults.forEach(item => {
                results.push({ type: 'content', title: 'Definição Teológica', text: item.content, sentinel: 10 });
            });
        }
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
                    { nome: "BDAG", resolve: "Significado das palavras gregas do NT com toda a amplitude semântica.", nivel: "ESSENCIAL" },
                    { nome: "HALOT", resolve: "Léxico hebraico e aramaico do AT — padrão acadêmico internacional.", nivel: "ESSENCIAL" },
                    { nome: "LSJ", resolve: "Léxico do grego clássico — contexto pré-NT das palavras gregas.", nivel: "ALTO" }
                ]},
                { id: 2, nome: "CAMADA 2 — LÉXICO TEOLÓGICO AVANÇADO", sub: "Como a palavra funciona na história da redenção", recursos: [
                    { nome: "TDNT (Kittel)", resolve: "Dicionário teológico do NT — origem, contexto e uso.", nivel: "MUITO ALTO" },
                    { nome: "TDOT", resolve: "Equivalente ao TDNT para o AT — dicionário teológico do hebraico.", nivel: "MUITO ALTO" },
                    { nome: "NIDNTTE", resolve: "Versão evangélica revisada do TDNT. Cobre 3.000+ palavras gregas.", nivel: "ESSENCIAL+" },
                    { nome: "NIDOTTE", resolve: "Equivalente evangélico do TDOT — dicionário teológico do AT.", nivel: "ESSENCIAL+" }
                ]},
                { id: 3, nome: "CAMADA 3 — COMENTÁRIOS EXEGÉTICOS (NT)", sub: "Análise versículo a versículo com rigor no texto grego", recursos: [
                    { nome: "NICNT", resolve: "Equilíbrio entre grego, teologia e clareza pastoral.", nivel: "ALTO" },
                    { nome: "BECNT", resolve: "Mais técnico que o NICNT, forte no grego e teologia bíblica.", nivel: "MUITO ALTO" },
                    { nome: "NIGTC", resolve: "Nível de doutorado — aparato crítico completo.", nivel: "MUITO ALTO" },
                    { nome: "Pillar (PNTC)", resolve: "Exegese clara com base textual sólida e sensibilidade pastoral.", nivel: "ALTO" }
                ]},
                { id: 4, nome: "CAMADA 4 — COMENTÁRIOS EXEGÉTICOS (AT)", sub: "Análise rigorosa do texto hebraico", recursos: [
                    { nome: "NICOT", resolve: "Exegese séria do AT com base no hebraico.", nivel: "ALTO" },
                    { nome: "Baker OT (BCOTWP)", resolve: "Exegese detalhada — Pentateuco, sabedoria e poesia.", nivel: "ALTO" },
                    { nome: "Word Biblical (AT)", resolve: "Rigor acadêmico máximo — crítica textual e contexto ANE.", nivel: "MUITO ALTO" }
                ]},
                { id: 5, nome: "CAMADA 5 — TEOLOGIA BÍBLICA", sub: "A Escritura como história unificada da redenção", recursos: [
                    { nome: "G.K. Beale", resolve: "Como o NT desdobra o AT inteiro. Unidade canônica.", nivel: "ESSENCIAL+" },
                    { nome: "Carson & Beale", resolve: "O recurso definitivo sobre citações e alusões do AT no NT.", nivel: "ESSENCIAL+" },
                    { nome: "Goldsworthy", resolve: "Teologia bíblica acessível e profunda com visão reformada.", nivel: "ALTO" },
                    { nome: "Geerhardus Vos", resolve: "Clássico fundacional da teologia bíblica reformada.", nivel: "ALTO" }
                ]},
                { id: 6, nome: "CAMADA 6 — TEOLOGIA SISTEMÁTICA", sub: "Doutrina cristã organizada com rigor acadêmico", recursos: [
                    { nome: "Wayne Grudem", resolve: "O mais usado em seminários. Referência padrão doutrinária.", nivel: "ESSENCIAL+" },
                    { nome: "Louis Berkhof", resolve: "Clássico reformado de referência — rigoroso e denso.", nivel: "ALTO" },
                    { nome: "John Frame", resolve: "Teologia sistemática de perspectiva pressuposicionalista.", nivel: "ALTO" },
                    { nome: "EDT", resolve: "Dicionário de Teologia Evangélica. Verbetes concisos.", nivel: "ALTO" }
                ]},
                { id: 7, nome: "CAMADA 7 — CONTEXTO HISTÓRICO E CULTURAL", sub: "O mundo por trás do texto", recursos: [
                    { nome: "Zondervan Enc.", resolve: "Contexto histórico, arqueologia e cultura bíblica.", nivel: "ALTO" },
                    { nome: "Keener (IVP)", resolve: "Contexto sociocultural versículo a versículo do NT.", nivel: "ALTO" },
                    { nome: "ANET/COS", resolve: "Textos primários do Oriente Próximo Antigo — paralelos.", nivel: "MUITO ALTO" }
                ]},
                { id: 8, nome: "CAMADA 8 — HERMENÊUTICA E INTRODUÇÃO", sub: "Como ler a Bíblia corretamente", recursos: [
                    { nome: "Carson & Moo", resolve: "Introdução ao NT — autoria, data e teologia.", nivel: "ALTO" },
                    { nome: "Dillard & Longman", resolve: "Estrutura literária e teologia do AT.", nivel: "ALTO" },
                    { nome: "Grant Osborne", resolve: "Manual de hermenêutica evangélica (Espiral).", nivel: "ALTO" }
                ]},
                { id: 9, nome: "CAMADA 9 — FERRAMENTAS DIGITAIS", sub: "Plataformas que integram toda a biblioteca", recursos: [
                    { nome: "Logos Software", resolve: "Plataforma que integra todos os recursos acima.", nivel: "FERRAMENTA" },
                    { nome: "Accordance", resolve: "Alternativa premium para textos originais.", nivel: "FERRAMENTA" },
                    { nome: "ESV Study Bible", resolve: "Notas rápidas e visão panorâmica confiável.", nivel: "MÉDIO-ALTO" }
                ]}
            ],
            fluxo: [
                "Identificar palavras-chave e significado lexical (BDAG/HALOT)",
                "Aprofundar a dimensão teológica (NIDNTTE/NIDOTTE)",
                "Analisar contexto literário imediato (BECNT/NICNT)",
                "Posicionar no arco canônico (Beale NT Theology)",
                "Contextualizar historicamente (Zondervan/IVP)",
                "Validar a doutrina envolvida (Grudem/Berkhof)",
                "Síntese Pessoal fundamentada"
            ]
        };
    }
};
window.M00 = M00;
