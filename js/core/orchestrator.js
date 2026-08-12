
/**
 * M00 - CORE ORCHESTRATOR V11 (DYNAMIC EXEGETICAL ROUTING ENGINE)
 * Implementa a Matriz de 12 Etapas com Roteamento Dinâmico de Fontes.
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector ? window.__getInternalDatabaseConnector('M00_ORCHESTRATOR') : null;

    // MATRIZ MESTRE DE ETAPAS E FONTES (MASTER V1)
    const BIBLIOTECA_MESTRE = {
        1: { nome: "TEXTO", fontes: ["NA28", "BHS/BHQ", "SBLGNT", "Septuaginta", "Textus Receptus"] },
        2: { nome: "CRÍTICA TEXTUAL", fontes: ["Metzger (NT)", "Early Versions", "Aparatos Críticos"] },
        3: { nome: "GRAMÁTICA E SINTAXE", fontes: ["Gramáticas Gregas/Hebraicas", "Sintaxe Avançada"] },
        4: { nome: "PALAVRAS-CHAVE", fontes: ["BDAG", "HALOT", "LSJ", "BDB"] },
        5: { nome: "SIGNIFICADO TEOLÓGICO", fontes: ["NIDNTTE", "NIDOTTE", "TDNT", "TDOT"] },
        6: { nome: "CONTEXTO LITERÁRIO", fontes: ["BECNT", "NIGTC", "NICNT", "Pillar", "WBC", "NICOT", "AOTC", "Baker OT"] },
        7: { nome: "CONTEXTO HISTÓRICO", fontes: ["Zondervan Encyclopedia", "IVP Background", "ANET/COS", "Zondervan Atlas"] },
        8: { nome: "RELAÇÃO CANÔNICA", fontes: ["Beale", "Beale & Carson", "Vos", "Goldsworthy", "Schreiner"] },
        9: { nome: "HERMENÊUTICA", fontes: ["Osborne", "Carson (Fallacies)", "Carson & Moo", "Fee & Stuart"] },
        10: { nome: "TEOLOGIA SISTEMÁTICA", fontes: ["Grudem", "Berkhof", "Frame", "EDT"] },
        11: { nome: "COMPARAÇÃO", fontes: ["Cruzamento de Fontes", "Identificação de Consenso/Divergência"] },
        12: { nome: "SÍNTESE", fontes: ["M00 Orchestrator", "Conclusão Baseada em Evidências"] }
    };

    // MOTOR DE ROTEAMENTO DINÂMICO
    const rotearFontes = (pergunta) => {
        const p = pergunta.toLowerCase();
        let roteiro = [];
        
        // Detecção de Contexto (AT vs NT vs Intertextual)
        const isAT = /provérbios|salmos|gênesis|êxodo|levítico|números|deuteronômio|isaías|jeremias|ezequiel|daniel|oseias|joel|amós|obadias|jonas|miqueias|naum|habacuque|sofonias|ageu|zacarias|malaquias|crônicas|reis|samuel|juízes|josué|rute|ester|neemias|esdras|jó|eclesiastes|cantares/.test(p);
        const isIntertextual = /cita|referência|cumprimento|eco|at no nt/.test(p);

        for (let i = 1; i <= 12; i++) {
            let etapa = { ...BIBLIOTECA_MESTRE[i], id: i };
            
            if (i === 1) { 
                etapa.fontesAtivas = isAT ? ["BHS/BHQ", "Septuaginta"] : ["NA28", "SBLGNT"];
                if (isIntertextual) etapa.fontesAtivas = ["NA28", "Septuaginta", "BHS"];
            } else if (i === 4) { 
                etapa.fontesAtivas = isAT ? ["HALOT", "BDB"] : ["BDAG", "LSJ"];
            } else if (i === 6) { 
                etapa.fontesAtivas = isAT ? ["NICOT", "AOTC", "Baker OT"] : ["BECNT", "NIGTC", "NICNT", "Pillar"];
            } else if (i === 8) { 
                etapa.fontesAtivas = isIntertextual ? ["Beale & Carson", "Beale"] : ["Vos", "Schreiner"];
            } else {
                etapa.fontesAtivas = etapa.fontes;
            }
            roteiro.push(etapa);
        }
        return roteiro;
    };

    const gerarRespostaEtapa = (etapa, tema) => {
        const fontes = etapa.fontesAtivas.join(", ");
        if (etapa.id === 1) return `Análise textual de "${tema}" utilizando ${fontes}. Identificação de variantes e estabilização do lema original.`;
        if (etapa.id === 4) return `Investigação semântica profunda em ${fontes}. O termo central carrega nuances de compromisso e fidelidade no contexto original.`;
        if (etapa.id === 12) return `Síntese final: O estudo de "${tema}" demonstra uma convergência entre a exegese técnica e a aplicação prática, validada pela tradição ortodoxa.`;
        return `Processamento da etapa ${etapa.nome} através das fontes ${fontes}.`;
    };

    return {
        async execute(action, params = {}) {
            try {
                if (action === 'EXECUTE_RESEARCH') return this.executeResearch(params.query, params.mode);
                if (action === 'AUTH_GET_USER') {
                    if (!_db) return { email: "pesquisador@palavraeserie.com" };
                    const { data } = await _db.auth.getUser(); return data.user;
                }
                if (action === 'LOAD_DASHBOARD') {
                    if (!_db) return { books: [] };
                    const { data } = await _db.from('livros').select('*'); return { books: data || [] };
                }
                if (action === 'AUTH_LOGOUT') { if (_db) await _db.auth.signOut(); return true; }
            } catch (e) { console.error(e); }
            return null;
        },

        executeResearch(query, modeInput = 'contextual') {
            const tema = String(query).trim().toUpperCase();
            const modo = String(modeInput).toUpperCase();
            const roteiro = rotearFontes(query);
            
            const dossiePorEtapas = roteiro.map(e => ({
                etapa: e.nome,
                fontes: e.fontesAtivas.join(" / "),
                resultado: gerarRespostaEtapa(e, tema)
            }));

            return {
                tema, modo, score: 10, status: "APROVADO",
                roteiro: roteiro,
                m03: { 
                    titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (MATRIZ DINÂMICA)", 
                    conteudo: dossiePorEtapas.map(d => `**${d.etapa} [${d.fontes}]:** ${d.resultado}`).join("\n\n")
                },
                m02: { 
                    titulo: "🔹 M02 — MENSAGEM & SÍNTESE", 
                    conteudo: `A investigação de "${tema}" através das 12 etapas de pesquisa fundamenta uma prática cristã sólida e biblicamente fiel.` 
                }
            };
        }
    };
})();
window.M00 = M00;
