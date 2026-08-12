/**
 * M00 - CORE ORCHESTRATOR (MASTER V1 - VERSÃO FINAL ESTÁVEL)
 */
const M00 = {
    async execute(action, params = {}) {
        console.log(`[M00] Executando ação canônica: ${action}`);
        try {
            switch (action) {
                case 'AUTH_GET_USER':
                    const { data: { user } } = await supabase.auth.getUser();
                    return user;
                case 'AUTH_LOGOUT':
                    return await supabase.auth.signOut();
                case 'LOAD_DASHBOARD':
                    const { data: books } = await supabase.from('livros').select('*');
                    return { profile: { level: 1, faith: 85, prayer: 70 }, books: books || [] };
                case 'QUERY_THEME':
                    // A função é chamada com await, então aqui ela deve retornar o resultado corretamente
                    return this.generateMasterDossier(params.query);
                case 'BIBLIOTECA_AVANCADA':
                    return { camadas: [{ id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [{ nome: "BDAG", resolve: "Grego NT" }] }] };
                default: return null;
            }
        } catch (e) { 
            console.error("Erro no Orquestrador:", e); 
            return null; 
        }
    },

    generateMasterDossier(query) {
        const tema = (query || "").trim().toLowerCase();
        const base = {
            'fé': {
                originais: "Hebraico: 'Emunah' (אֱמוּנָה) | Grego: 'Pistis' (πίστις)",
                exegese: "A fé bíblica é a confiança relacional baseada na fidelidade de Deus à Sua aliança. No NT, implica em entrega total à obra de Cristo.",
                mensagem: "A fé transforma a perspectiva humana, permitindo enxergar a realidade através das promessas eternas de Deus.",
                score: 10
            },
            'pai': {
                originais: "Hebraico: 'Ab' (אָב) | Grego: 'Pater' (πατήρ)",
                exegese: "A paternidade divina revela o cuidado providente e a autoridade amorosa de Deus. Em Cristo, somos adotados e recebemos o Espírito para clamar 'Abba, Pai'.",
                mensagem: "Reconhecer Deus como Pai é encontrar a segurança e a identidade que o mundo não pode oferecer.",
                score: 12
            }
        };

        const info = base[tema] || {
            originais: `Consulte as 9 Camadas para os originais de "${query}".`,
            exegese: `Análise exegética rigorosa do tema "${query}" sob o método histórico-gramatical.`,
            mensagem: `A revelação de "${query}" visa o amadurecimento espiritual e a centralidade de Cristo.`,
            score: 25
        };

        return {
            tema: query.toUpperCase(),
            score: info.score,
            status: "APROVADO",
            m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO", originais: info.originais, conteudo: info.exegese },
            m02: { titulo: "🔹 M02 — MENSAGEM", conteudo: info.mensagem },
            cta: { v1: "O que você leu aqui é apenas a superfície.", v2: "Avance para o estudo completo no PRO." }
        };
    }
};
window.M00 = M00;
