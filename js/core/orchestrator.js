/**
 * M00 - CORE ORCHESTRATOR (ARQUITETURA MASTER V1 - INTELIGÊNCIA EXPANDIDA)
 * Único ponto de entrada e detentor da inteligência teológica.
 */
const M00 = (function() {
    const _db = window.supabaseClientInstance;

    return {
        async execute(action, params = {}) {
            if (action === 'BIBLIOTECA_AVANCADA') return this.getLibraryData();
            if (action === 'QUERY_THEME') return this.generateDeepTheologicalDossier(params.query);
            if (action === 'AUTH_GET_USER') { const {data} = await _db.auth.getUser(); return data.user; }
            if (action === 'LOAD_DASHBOARD') {
                const {data: books} = await _db.from('livros').select('*');
                return { profile: { level: 1, faith: 95, prayer: 90 }, books: books || [] };
            }
            if (action === 'AUTH_LOGOUT') return await _db.auth.signOut();
            return null;
        },

        generateDeepTheologicalDossier(query) {
            const tema = (query || "").trim().toLowerCase();
            
            const baseMaster = {
                'senhor': {
                    originais: "Hebraico: 'Adonai' (אֲדֹנָי) | Grego: 'Kyrios' (κύριος)",
                    exegese: "O termo 'Adonai' enfatiza a soberania absoluta de Deus. No NT, a aplicação de 'Kyrios' a Jesus (Fp 2:11) é a declaração máxima de Sua divindade, identificando-O com o Yahweh do AT. O senhorio de Cristo exige rendição total da vontade.",
                    mensagem: "Reconhecer Jesus como Senhor transforma cada área da vida. Ele não é apenas Salvador, mas o Governante supremo de nossos pensamentos e ações.",
                    score: 10
                },
                'fé': {
                    originais: "Hebraico: 'Emunah' (אֱמוּנָה) | Grego: 'Pistis' (πίστις)",
                    exegese: "A fé bíblica ('Emunah') significa firmeza e fidelidade à aliança. Não é mera crença intelectual, mas uma confiança relacional inabalável no caráter de Deus, mesmo em meio às provas.",
                    mensagem: "Viver pela fé é caminhar na certeza das promessas divinas. É o motor da santificação e a base da nossa justificação diante de Deus.",
                    score: 8
                },
                'justiça': {
                    originais: "Hebraico: 'Tsedeq' (צֶדֶק) | Grego: 'Dikaiosyne' (δικαιοσύνη)",
                    exegese: "Refere-se à conformidade com o padrão moral de Deus. Na cruz, a justiça punitiva e restauradora de Deus se encontram, permitindo que Ele seja justo e justificador.",
                    mensagem: "Em Cristo, a justiça de Deus nos é imputada. Somos declarados justos pela graça para vivermos de forma íntegra e santa.",
                    score: 15
                }
            };

            const info = baseMaster[tema] || {
                originais: `Consulte as Camadas 1 e 2 para os originais de "${query}".`,
                exegese: `Análise exegética do tema "${query}" sob o método histórico-gramatical através das 9 camadas.`,
                mensagem: `A revelação de "${query}" visa a edificação do corpo de Cristo e a glória de Deus.`,
                score: 25
            };

            return {
                tema: query.toUpperCase(),
                score: info.score,
                status: "APROVADO",
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)", originais: info.originais, conteudo: info.exegese },
                m02: { titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)", conteudo: info.mensagem },
                cta: { v1: "O que você leu aqui é apenas a superfície exegética.", v2: "Avance para o estudo completo no plano PRO." },
                camadas: this.getLibraryData().camadas
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
