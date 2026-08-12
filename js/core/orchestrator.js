/**
 * M00 - CORE ORCHESTRATOR V9.5 (ARQUITETURA DE MATRIZ TÉCNICA)
 * Gerencia a Matriz de Pesquisa: Etapa -> Fonte -> Função.
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');

    // MATRIZ MESTRE DE PESQUISA (FONTE DE VERDADE MASTER V1)
    const MATRIZ_PESQUISA = [
        { etapa: "Texto", fonte: "NA28", funcao: "Texto grego crítico" },
        { etapa: "Texto", fonte: "BHS", funcao: "Texto hebraico" },
        { etapa: "Crítica", fonte: "Metzger", funcao: "Transmissão textual" },
        { etapa: "Gramática", fonte: "Gramática Grega", funcao: "Sintaxe" },
        { etapa: "Léxico", fonte: "BDAG", funcao: "Semântica NT" },
        { etapa: "Léxico", fonte: "HALOT", funcao: "Semântica AT" },
        { etapa: "Teológico", fonte: "NIDNTTE", funcao: "Desenvolvimento conceitual NT" },
        { etapa: "Exegese", fonte: "BECNT", funcao: "Exegese NT" },
        { etapa: "Contexto", fonte: "IVP", funcao: "Contexto histórico" },
        { etapa: "Cânon", fonte: "Beale", funcao: "Teologia bíblica" },
        { etapa: "Hermenêutica", fonte: "Osborne", funcao: "Método interpretativo" },
        { etapa: "Doutrina", fonte: "Grudem", funcao: "Validação sistemática" },
        { etapa: "Síntese", fonte: "Todas as etapas", funcao: "Conclusão" }
    ];

    const bibliotecaTeologica = {
        "AMOR": {
            exegese: "A análise de Agápē (NA28) em 1 Co 13 revela que este amor é a 'via sobremodo excelente'. No contexto bíblico, ele é a essência do caráter de Deus (1 Jo 4:8). Diferente de 'Philia', o Agápē não busca o seu próprio interesse, mas o bem supremo do outro.",
            mensagem: "O Amor não é uma opção para o cristão, é a evidência da regeneração. Viver o Agápē significa refletir a glória de Deus em relacionamentos que priorizam o próximo acima do eu."
        },
        "SANTIDADE": {
            exegese: "O conceito de Qadosh (BHS/HALOT) no Antigo Testamento aponta para a transcendência de Deus. No Levítico, a santidade é um imperativo ('Sede santos porque eu sou santo'). A santidade é o atributo que protege a glória de Deus.",
            mensagem: "A santidade não é legalismo, é liberdade. Fomos separados do mundo para pertencermos ao Criador, vivendo uma vida que aponta para a perfeição de Cristo."
        }
    };

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
            const modo = String(modeInput).toUpperCase();
            
            let fluxoSelecionado = [];
            if (modo === 'RAPIDA') {
                fluxoSelecionado = [MATRIZ_PESQUISA[0], MATRIZ_PESQUISA[4], MATRIZ_PESQUISA[12]];
            } else if (modo === 'EXEGETICA') {
                fluxoSelecionado = MATRIZ_PESQUISA.slice(0, 8).concat(MATRIZ_PESQUISA[12]);
            } else if (modo === 'PRO') {
                fluxoSelecionado = [...MATRIZ_PESQUISA];
            } else {
                fluxoSelecionado = [MATRIZ_PESQUISA[0], MATRIZ_PESQUISA[8], MATRIZ_PESQUISA[11], MATRIZ_PESQUISA[12]];
            }

            const info = bibliotecaTeologica[tema] || {
                exegese: `A investigação teológica de ${tema} percorre toda a história da redenção, desde as promessas patriarcais até a consumação escatológica.`,
                mensagem: `O chamado bíblico referente a ${tema} é um convite à transformação integral do ser, alinhando o coração do homem aos propósitos eternos de Deus.`
            };

            return {
                tema, modo, score: 15, status: "APROVADO", 
                fluxo: fluxoSelecionado,
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)", conteudo: info.exegese },
                m02: { titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)", conteudo: info.mensagem }
            };
        }
    };
})();
window.M00 = M00;
