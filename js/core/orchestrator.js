/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA MASTER V1)
 * Fluxo: M03 (Exegese) -> M02 (Mensagem) -> CTA (Conversão)
 */
const M00 = {
    async execute(engine, params = {}) {
        if (engine === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
        if (engine === 'SENTINELA') return await this.generateMasterDossier(params.query);
        if (engine === 'PRO') {
            const { data } = await supabase.from('livros').select('*');
            return data || [];
        }
        return {};
    },

    async generateMasterDossier(query) {
        const tema = query.toLowerCase();
        
        // M03 - EXEGESE (ENTENDIMENTO)
        const m03 = {
            titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)",
            originais: this.getOriginals(tema),
            contexto: `A análise de "${query}" exige rigor histórico-gramatical nas camadas 1 e 3.`,
            interpretacao: `O sentido original de "${query}" deve governar a aplicação contemporânea.`
        };

        // M02 - MENSAGEM (TRANSFORMAÇÃO)
        const m02 = {
            titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)",
            hook: `Como o tema "${query}" impacta sua eternidade hoje?`,
            revelacao: `Em Cristo, "${query}" encontra seu cumprimento e significado pleno.`,
            aplicacao: `A resposta prática a "${query}" é uma vida de adoração e obediência.`
        };

        // CTAs DE CONVERSÃO (CONFORME DOCUMENTO MESTRE)
        const cta = {
            v1: "O que você leu aqui é apenas a superfície. Existe uma camada mais profunda onde o original revela algo que muda tudo.",
            v2: "Você pode parar na superfície... ou avançar para a transformação real no PRO."
        };

        return { tema: query.toUpperCase(), m03, m02, cta };
    },

    getOriginals(tema) {
        const base = {
            'amor': 'Hebraico: Ahavah (אַהֲבָה) | Grego: Agape (ἀγάπη)',
            'fé': 'Hebraico: Emunah (אֱמוּנָה) | Grego: Pistis (πίσטיס)',
            'graça': 'Hebraico: Chen (חֵן) | Grego: Charis (χάρις)'
        };
        return base[tema] || `Consulte as 9 Camadas para o original de "${tema}".`;
    },

    getLibraryData() {
        return {
            camadas: [
                { id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [{ nome: "BDAG", resolve: "Grego NT" }, { nome: "HALOT", resolve: "Hebraico AT" }] },
                { id: 6, nome: "CAMADA 6 — SISTEMÁTICA", recursos: [{ nome: "Grudem", resolve: "Doutrina" }, { nome: "Berkhof", resolve: "Clássico" }] }
            ]
        };
    }
};
window.M00 = M00;
