/**
 * M00 - CORE ORCHESTRATOR V9.4 (SÍNTESE TEOLÓGICA AVANÇADA)
 * Gera relatórios automáticos e ricos baseados no nível de profundidade.
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');

    // Motor de Inteligência para Geração de Conteúdo
    const gerarConteudoRico = (tema, modo) => {
        const t = tema.toUpperCase();
        
        // Base de dados de conhecimento para temas principais
        const conhecimento = {
            "AMOR": {
                original: "Agápē (Grego)",
                definicao: "Amor sacrificial, incondicional e baseado na vontade, não apenas na emoção.",
                exegese_pro: "A análise de Agápē em 1 Co 13 revela que este amor é a 'via sobremodo excelente'. No contexto bíblico, ele é a essência do caráter de Deus (1 Jo 4:8). Diferente de 'Philia', o Agápē não busca o seu próprio interesse, mas o bem supremo do outro, culminando na Kenosis (esvaziamento) de Cristo em Fp 2.",
                mensagem: "O Amor não é uma opção para o cristão, é a evidência da regeneração. Viver o Agápē significa refletir a glória de Deus em relacionamentos que priorizam o próximo acima do eu."
            },
            "SANTIDADE": {
                original: "Qadosh (Hebraico) / Hagios (Grego)",
                definicao: "Separação total para o uso exclusivo de Deus; pureza absoluta.",
                exegese_pro: "O conceito de Qadosh no Antigo Testamento aponta para a transcendência de Deus. No Levítico, a santidade é um imperativo ('Sede santos porque eu sou santo'). A exegese profunda mostra que a santidade é o atributo que protege a glória de Deus, exigindo medição e sacrifício para a aproximação humana.",
                mensagem: "A santidade não é legalismo, é liberdade. Fomos separados do mundo para pertencermos ao Criador, vivendo uma vida que aponta para a perfeição de Cristo."
            }
        };

        const base = conhecimento[t] || {
            original: "Termo Original em Análise",
            definicao: `Estudo sistemático sobre o conceito de ${t} nas Escrituras.`,
            exegese_pro: `A investigação teológica de ${t} percorre toda a história da redenção, desde as promessas patriarcais até a consumação escatológica. Este tema é central para a compreensão da vontade divina para a humanidade.`,
            mensagem: `O chamado bíblico referente a ${t} é um convite à transformação integral do ser, alinhando o coração do homem aos propósitos eternos de Deus.`
        };

        // Personaliza o conteúdo com base no Nível (Modo)
        let m03_final = "";
        let m02_final = base.mensagem;

        if (modo === 'RAPIDA') {
            m03_final = `**Definição:** ${base.definicao} \n\n **Original:** ${base.original}`;
        } else if (modo === 'EXEGETICA' || modo === 'PROFUNDA') {
            m03_final = `**Análise Exegética:** ${base.exegese_pro.substring(0, 200)}... \n\n **Contexto:** O termo ${base.original} é fundamental para esta compreensão.`;
        } else if (modo === 'PRO') {
            m03_final = `**DOSSIÊ COMPLETO:** \n\n ${base.exegese_pro} \n\n **Raiz Linguística:** ${base.original} \n\n **Impacto Teológico:** Este tema altera a nossa percepção da Soteriologia e Eclesiologia.`;
        } else {
            m03_final = `**Contexto Geral:** ${base.definicao}`;
        }

        return { m03: m03_final, m02: m02_final };
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
            
            const conteudo = gerarConteudoRico(tema, modo);

            let etapas = ["Texto", "Contexto", "Evidências", "Síntese"];
            if (modo === 'EXEGETICA') etapas = ["Texto Original", "Morfologia", "Sintaxe", "Léxico", "Exegese"];
            if (modo === 'PRO') etapas = ["Crítica Textual", "Gramática", "Semântica", "Contexto", "Intertextualidade", "Exegese", "Teologia", "Hermenêutica", "Sistemática", "Validação", "Síntese"];

            return {
                tema, modo, score: 15, status: "APROVADO", etapas,
                m03: { titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO", conteudo: conteudo.m03 },
                m02: { titulo: "🔹 M02 — MENSAGEM", conteudo: conteudo.m02 }
            };
        }
    };
})();
window.M00 = M00;
