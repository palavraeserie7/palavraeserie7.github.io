const M00 = {
    async execute(engine, params = {}) {
        if (engine === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
        if (engine === 'SENTINELA') return await this.universalSearch(params.query);
        return {};
    },

    async universalSearch(query) {
        const results = [];
        
        // 1. BUSCA NO BANCO DE DADOS (Tabela palavras)
        const { data: dbResults } = await supabase
            .from('palavras')
            .select('*')
            .ilike('content', `%${query}%`);
        
        if (dbResults) {
            dbResults.forEach(item => {
                results.push({
                    type: 'content',
                    title: 'Definição Teológica',
                    text: item.content,
                    sentinel: 10,
                    source: 'Base Interna V7'
                });
            });
        }

        // 2. BUSCA NO GUIA DE CAMADAS (Mapeamento de Estudo)
        const lib = this.getLibraryData();
        lib.camadas.forEach(c => {
            c.recursos.forEach(r => {
                if (r.nome.toLowerCase().includes(query.toLowerCase()) || 
                    r.resolve.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        type: 'resource',
                        title: r.nome,
                        text: `Use este recurso para: ${r.resolve}`,
                        camada: c.nome,
                        nivel: r.nivel,
                        sentinel: 5
                    });
                }
            });
        });

        return results;
    },

    getLibraryData() {
        return {
            camadas: [
                { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [
                    { nome: "BDAG", resolve: "Significado grego NT. Essencial para Santidade, Graça e Amor.", usar: "Termos-chave NT", nivel: "ESSENCIAL" },
                    { nome: "HALOT", resolve: "Léxico hebraico/aramaico AT", usar: "Palavras no AT", nivel: "ESSENCIAL" }
                ]},
                { id: 6, nome: "CAMADA 6 — TEOLOGIA SISTEMÁTICA", recursos: [
                    { nome: "Grudem", resolve: "Doutrinas bíblicas: Santidade, Trindade, Salvação, Igreja.", usar: "Qualquer questão doutrinária", nivel: "ESSENCIAL+" },
                    { nome: "Berkhof", resolve: "Teologia Reformada: Atributos de Deus, Santificação, Alianças.", usar: "Posição reformada histórica", nivel: "ALTO" }
                ]}
                // ... (Mantenha as outras camadas que você já salvou)
            ]
        };
    }
};
window.M00 = M00;
