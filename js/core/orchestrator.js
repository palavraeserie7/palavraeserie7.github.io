/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA MASTER V1 - EXEGESE PROFUNDA)
 * Único ponto de entrada e detentor exclusivo do conector de dados.
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');

    const Engines = {
        // E08 — Estado Espiritual
        async E08(userId) {
            if (!userId) return { level: 1, faith: 15, prayer: 20, maturity: 10, discipline: 25 };
            const { data } = await _db.from('profiles').select('*').eq('id', userId).single();
            return data || { level: 1, faith: 15, prayer: 20, maturity: 10, discipline: 25 };
        },

        // PRO — Recomendação e Estante
        async PRO() {
            const { data } = await _db.from('livros').select('*');
            return data ? data.filter(l => l.title) : [];
        },

        // SENTINELA EDITORIAL - MOTOR DE SÍNTESE EXEGÉTICA (ESCALA CANÔNICA)
        async Sentinela(query) {
            const tema = (query || "").trim().toLowerCase();
            
            const baseTeologica = {
                'pai': {
                    originais: "Hebraico: 'Ab' (אָב) | Aramaico: 'Abba' (אַבָּא) | Grego: 'Pater' (πατήρ)",
                    exegese: "A paternidade de Deus no AT é coletiva. Em Jesus, torna-se íntima. O termo 'Abba' revela uma confiança filial sem precedentes.",
                    mensagem: "Em Cristo, deixamos de ser órfãos espirituais para nos tornarmos herdeiros da promessa divina.",
                    score: 12 // 0-30 = APROVADO
                },
                'amor': {
                    originais: "Hebraico: 'Ahavah' (אַהֲבָה) | Grego: 'Agape' (ἀγάπη)",
                    exegese: "Agape é a decisão da vontade de buscar o bem do outro ao custo do sacrifício próprio (1 Jo 4:8).",
                    mensagem: "O amor é a evidência pública da regeneração e o motor de toda missão cristã.",
                    score: 5
                }
            };

            const info = baseTeologica[tema] || {
                originais: `Consulte as Camadas 1 e 2 para os originais de "${query}".`,
                exegese: `Análise histórico-gramatical do tema "${query}" sob o crivo da sã doutrina.`,
                mensagem: `A revelação de "${query}" visa a edificação do corpo de Cristo.`,
                score: 25
            };

            return {
                tema: query.toUpperCase(),
                score: info.score,
                status: info.score <= 30 ? "APROVADO" : (info.score <= 70 ? "ALERTA" : "BLOQUEADO"),
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)", originais: info.originais, conteudo: info.exegese },
                m02: { titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)", conteudo: info.mensagem },
                cta: { v1: "O que você leu aqui é apenas a superfície.", v2: "Avance para o estudo completo (PRO)." }
            };
        }
    };

    return {
        async execute(action, params = {}) {
            switch (action) {
                case 'AUTH_GET_USER':
                    const { data } = await _db.auth.getUser(); return data.user;
                case 'AUTH_LOGOUT':
                    return await _db.auth.signOut();
                case 'LOAD_DASHBOARD':
                    const profile = await Engines.E08(params.userId);
                    const books = await Engines.PRO();
                    return { profile, books };
                case 'QUERY_THEME':
                    return await Engines.Sentinela(params.query);
                case 'BIBLIOTECA_AVANCADA':
                    return { camadas: [{ id: 1, nome: "CAMADA 1 — LÉXICO BÁSICO", recursos: [{ nome: "BDAG", resolve: "Grego NT" }] }] };
                default: throw new Error("Ação não autorizada.");
            }
        }
    };
})();
window.M00 = M00;
