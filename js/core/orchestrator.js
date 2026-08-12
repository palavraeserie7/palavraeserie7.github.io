
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');
    const MATRIZ = [
        { etapa: "Texto", fonte: "NA28 / BHS", funcao: "Originais" },
        { etapa: "Léxico", fonte: "BDAG / HALOT", funcao: "Semântica" },
        { etapa: "Contexto", fonte: "IVP Background", funcao: "Histórico" },
        { etapa: "Exegese", fonte: "BECNT", funcao: "Sentido Original" },
        { etapa: "Sistemática", fonte: "Grudem", funcao: "Doutrina" },
        { etapa: "Síntese", fonte: "M00", funcao: "Conclusão" }
    ];

    return {
        async execute(action, params = {}) {
            if (action === 'AUTH_GET_USER') { const {data} = await _db.auth.getUser(); return data.user; }
            if (action === 'LOAD_DASHBOARD') { const {data} = await _db.from('livros').select('*'); return { books: data || [] }; }
            if (action === 'EXECUTE_RESEARCH') return this.executeResearch(params.query, params.mode);
            if (action === 'AUTH_LOGOUT') return await _db.auth.signOut();
        },
        executeResearch(query, mode) {
            const T = query.toUpperCase();
            return {
                tema: T, modo: mode.toUpperCase(), score: 15, status: "APROVADO",
                matrizFluxo: MATRIZ,
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO", conteudo: `Investigação exegética profunda sobre ${T} usando fontes acadêmicas validadas.` },
                m02: { titulo: "🔹 M02 — MENSAGEM", conteudo: `A aplicação prática de ${T} focada na transformação do caráter cristão.` }
            };
        }
    };
})();
window.M00 = M00;
