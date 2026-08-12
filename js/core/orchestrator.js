const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');
    return {
        async execute(action, params = {}) {
            try {
                if (action === 'EXECUTE_RESEARCH') return this.executeResearch(params.query, params.mode);
                if (action === 'AUTH_GET_USER') { const {data} = await _db.auth.getUser(); return data.user; }
                if (action === 'LOAD_DASHBOARD') {
                    const {data: books} = await _db.from('livros').select('*');
                    return { books: books || [] };
                }
                if (action === 'AUTH_LOGOUT') return await _db.auth.signOut();
            } catch (e) { console.error(e); }
            return null;
        },
        executeResearch(query, modeInput = 'contextual') {
            const tema = String(query || "TEMA").trim().toUpperCase();
            const mode = String(modeInput).toLowerCase();
            let etapas = ["Análise de Texto", "Contexto Histórico", "Evidências", "Validação", "Síntese Final"];
            if (mode === 'exegetica') etapas = ["Texto Original", "Morfologia", "Sintaxe", "Léxico", "Exegese"];
            if (mode === 'pro') etapas = ["Crítica Textual", "Gramática", "Semântica", "Contexto", "Intertextualidade", "Exegese", "Teologia", "Hermenêutica", "Sistemática", "Validação", "Síntese"];
            return {
                tema, modo: mode.toUpperCase(), score: 15, status: "APROVADO", etapas,
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO", conteudo: `Investigação exegética profunda sobre "${tema}" no nível ${mode.toUpperCase()}.` },
                m02: { titulo: "🔹 M02 — MENSAGEM", conteudo: `A aplicação teológica de "${tema}" focada na transformação do caráter cristão.` }
            };
        }
    };
})();
window.M00 = M00;
