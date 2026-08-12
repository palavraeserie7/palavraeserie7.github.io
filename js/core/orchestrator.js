/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA V7)
 * Biblioteca Bíblica Avançada - 9 Camadas Completas
 */
const M00 = {
    async execute(engine, params = {}) {
        console.log(`[M00] Executando: ${engine}`);
        if (engine === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
        if (engine === 'PRO') {
            const { data } = await supabase.from('livros').select('*');
            return data || [];
        }
        if (engine === 'SENTINELA') return this.searchLibrary(params.query);
        return {};
    },

    getLibraryData() {
        return {
            camadas: [
                { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", sub: "Significado exato das palavras originais", recursos: [
                    { nome: "BDAG", resolve: "Significado grego NT completo", usar: "Termos-chave NT", nivel: "ESSENCIAL" },
                    { nome: "HALOT", resolve: "Léxico hebraico/aramaico AT", usar: "Palavras no AT", nivel: "ESSENCIAL" },
                    { nome: "LSJ", resolve: "Grego clássico (pré-NT)", usar: "Etimologia antiga", nivel: "ALTO" }
                ]},
                { id: 2, nome: "CAMADA 2 — LÉXICO TEOLÓGICO AVANÇADO", sub: "Como a palavra funciona na história da redenção", recursos: [
                    { nome: "TDNT (Kittel)", resolve: "Dicionário teológico (10 vols)", usar: "Profundidade teológica NT", nivel: "MUITO ALTO" },
                    { nome: "TDOT", resolve: "Equivalente ao TDNT para o AT", usar: "Profundidade teológica AT", nivel: "MUITO ALTO" },
                    { nome: "NIDNTTE", resolve: "Perspectiva evangélica sólida", usar: "Exegese acadêmica", nivel: "ESSENCIAL+" }
                ]},
                { id: 3, nome: "CAMADA 3 — COMENTÁRIOS EXEGÉTICOS (NT)", sub: "Análise versículo a versículo (Grego)", recursos: [
                    { nome: "NICNT", resolve: "Equilíbrio grego e pastoral", usar: "Exegese séria do NT", nivel: "ALTO" },
                    { nome: "BECNT", resolve: "Rigor exegético máximo", usar: "Perspectiva evangélica", nivel: "MUITO ALTO" },
                    { nome: "NIGTC", resolve: "Nível de doutorado (aparato crítico)", usar: "Pesquisa acadêmica", nivel: "MUITO ALTO" }
                ]},
                { id: 4, nome: "CAMADA 4 — COMENTÁRIOS EXEGÉTICOS (AT)", sub: "Análise rigorosa do texto hebraico", recursos: [
                    { nome: "NICOT", resolve: "Exegese séria do AT", usar: "Qualquer texto do AT", nivel: "ALTO" },
                    { nome: "BCOTWP", resolve: "Pentateuco e Poesia", usar: "Sabedoria e Narrativa", nivel: "ALTO" },
                    { nome: "Word Biblical (AT)", resolve: "Rigor acadêmico e contexto ANE", usar: "Pesquisa profunda AT", nivel: "MUITO ALTO" }
                ]},
                { id: 5, nome: "CAMADA 5 — TEOLOGIA BÍBLICA", sub: "Escritura como história unificada", recursos: [
                    { nome: "G.K. Beale", resolve: "Unidade canônica (958 págs)", usar: "Arco redentor total", nivel: "ESSENCIAL+" },
                    { nome: "Carson & Beale", resolve: "Citações do AT no NT", usar: "Uso do AT pelo NT", nivel: "ESSENCIAL+" },
                    { nome: "Vos", resolve: "Clássico fundacional", usar: "Fundamento histórico", nivel: "ALTO" }
                ]},
                { id: 6, nome: "CAMADA 6 — TEOLOGIA SISTEMÁTICA", sub: "Doutrina organizada com rigor", recursos: [
                    { nome: "Grudem", resolve: "Padrão em seminários (1.200+ p)", usar: "Qualquer questão doutrinária", nivel: "ESSENCIAL+" },
                    { nome: "Berkhof", resolve: "Clássico reformado denso", usar: "Posição reformada histórica", nivel: "ALTO" },
                    { nome: "EDT", resolve: "Dicionário de verbetes concisos", usar: "Validar definições", nivel: "ALTO" }
                ]},
                { id: 7, nome: "CAMADA 7 — CONTEXTO HISTÓRICO", sub: "O mundo por trás do texto", recursos: [
                    { nome: "Zondervan Enc.", resolve: "Arqueologia e cultura bíblica", usar: "Costumes e lugares", nivel: "ALTO" },
                    { nome: "Keener (IVP)", resolve: "Contexto sociocultural NT", usar: "Versículo a versículo", nivel: "ALTO" },
                    { nome: "ANET/COS", resolve: "Textos primários Oriente Antigo", usar: "Paralelos históricos", nivel: "MUITO ALTO" }
                ]},
                { id: 8, nome: "CAMADA 8 — HERMENÊUTICA", sub: "Como ler a Bíblia corretamente", recursos: [
                    { nome: "Carson & Moo", resolve: "Introdução ao NT padrão", usar: "Antes de estudar o NT", nivel: "ALTO" },
                    { nome: "Osborne", resolve: "Espiral Hermenêutica", usar: "Método de interpretação", nivel: "ALTO" },
                    { nome: "D.A. Carson", resolve: "Falácias Exegéticas", usar: "Evitar erros clássicos", nivel: "ALTO" }
                ]},
                { id: 9, nome: "CAMADA 9 — FERRAMENTAS DIGITAIS", sub: "Plataformas de integração", recursos: [
                    { nome: "Logos Software", resolve: "Integra todos os recursos acima", usar: "Multiplicar o poder de estudo", nivel: "FERRAMENTA" },
                    { nome: "Accordance", resolve: "Textos originais premium", usar: "Trabalho textual", nivel: "FERRAMENTA" },
                    { nome: "ESV Study Bible", resolve: "Visão geral confiável", usar: "Pré-estudo panorâmico", nivel: "MÉDIO-ALTO" }
                ]}
            ]
        };
    },

    searchLibrary(query) {
        const data = this.getLibraryData();
        return data.camadas.flatMap(c => c.recursos.filter(r => 
            r.nome.toLowerCase().includes(query.toLowerCase()) || 
            r.resolve.toLowerCase().includes(query.toLowerCase())
        ));
    }
};
window.M00 = M00;
