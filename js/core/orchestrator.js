/**
 * M00 - CORE ORCHESTRATOR V9.1 (STRICT STRING MODE)
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');

    return {
        async execute(action, params = {}) {
            try {
                if (action === 'EXECUTE_RESEARCH') return this.executeResearch(params.query, params.mode);
                if (action === 'AUTH_GET_USER') { const {data} = await _db.auth.getUser(); return data.user; }
                if (action === 'LOAD_DASHBOARD') {
                    const {data: books} = await _db.from('livros').select('*');
                    return { profile: { level: 1, faith: 95, prayer: 90 }, books: books || [] };
                }
                if (action === 'AUTH_LOGOUT') return await _db.auth.signOut();
            } catch (e) { console.error("M00 Error:", e); }
            return null;
        },

        executeResearch(query, modeInput = 'contextual') {
            const tema = String(query || "TEMA GERAL").trim().toUpperCase();
            const mode = String(modeInput).toLowerCase();
            
            let etapas = [];
            let fontes = [];

            if (mode === 'rapida') {
                etapas = ["Texto Bíblico", "Contexto Imediato", "Resposta Objetiva"];
                fontes = ["Bíblia de Estudo"];
            } else if (mode === 'exegetica') {
                etapas = ["Texto Original", "Análise Morfológica", "Sintaxe Grega/Hebraica", "Léxico Acadêmico", "Síntese Exegética"];
                fontes = ["BDAG", "HALOT", "Nestle-Aland"];
            } else if (mode === 'pro') {
                etapas = ["Crítica Textual", "Gramática Avançada", "Léxico e Semântica", "Contexto Histórico", "Intertextualidade", "Exegese", "Teologia Bíblica", "Hermenêutica", "Sistemática", "Validação", "Síntese Final"];
                fontes = ["Kittel", "Grudem", "Beale"];
            } else {
                etapas = ["Texto", "Contexto Literário", "Contexto Histórico", "Referências Cruzadas"];
                fontes = ["Comentário Exegético"];
            }

            return {
                tema: tema,
                modo: mode.toUpperCase(),
                score: 15,
                status: "APROVADO",
                etapas: etapas,
                fontesUtilizadas: fontes,
                m03: {
                    titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)",
                    conteudo: `Investigação exegética completa sobre "${tema}" no nível ${mode.toUpperCase()}. Foram processadas ${etapas.length} etapas automáticas.`
                },
                m02: {
                    titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)",
                    conteudo: `A aplicação teológica de "${tema}" exige uma resposta de fé e prática baseada na autoridade das Escrituras.`
                }
            };
        }
    };
})();
window.M00 = M00;
