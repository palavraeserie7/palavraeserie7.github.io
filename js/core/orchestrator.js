/**
 * M00 - CORE ORCHESTRATOR V9.3 (INTELECTO TEOLÓGICO)
 * Gerencia a geração de relatórios ricos baseados em temas bíblicos.
 */
const M00 = (function() {
    const _db = window.__getInternalDatabaseConnector('M00_ORCHESTRATOR');

    // Base de Conhecimento Teológico para Síntese Automática
    const bibliotecaTeologica = {
        "AMOR": {
            exegese: "No grego, o termo 'Agápē' descreve o amor incondicional e sacrificial de Deus. Diferente de 'Philia' (amizade) ou 'Eros' (romântico), o Agápē é uma decisão da vontade em favor do outro, exemplificado perfeitamente no sacrifício de Cristo na cruz (Jo 3:16).",
            mensagem: "O amor cristão não é um sentimento passageiro, mas a base da ética do Reino. Somos chamados a amar como fomos amados, transformando nossas relações em reflexos da graça divina."
        },
        "GRAÇA": {
            exegese: "O termo 'Charis' aponta para o favor imerecido de Deus. Na teologia paulina, a graça é a força motriz da salvação (Ef 2:8-9), operando independentemente das obras humanas para restaurar a comunhão com o Criador.",
            mensagem: "Viver na graça significa abandonar a autossuficiência. É o descanso na obra consumada de Cristo, que nos capacita a viver uma vida de santidade não por medo, mas por gratidão."
        },
        "SANTIDADE": {
            exegese: "Do hebraico 'Qadosh', significa separação ou consagração. Não é apenas ausência de pecado, mas a dedicação total ao serviço de Deus. No AT, a santidade de Deus é o padrão que exige pureza ritual e moral do povo da aliança.",
            mensagem: "A santidade hoje é a nossa resposta ao chamado de sermos 'luz do mundo'. É um processo de santificação contínuo onde o Espírito Santo molda nosso caráter à imagem de Jesus."
        },
        "JUSTIFICAÇÃO": {
            exegese: "O termo jurídico 'Dikaiosyne' refere-se ao ato de Deus declarar o pecador como justo. Não é um processo de tornar alguém bom, mas uma mudança de status legal diante do tribunal divino, baseada na justiça imputada de Cristo.",
            mensagem: "Saber que fomos justificados traz paz com Deus. Não precisamos mais provar nosso valor; nossa aceitação está garantida naquele que morreu em nosso lugar."
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
            const temaBusca = String(query || "").trim().toUpperCase();
            const mode = String(modeInput).toLowerCase();
            
            // Busca o conteúdo rico na biblioteca ou gera um padrão se não encontrar
            const info = bibliotecaTeologica[temaBusca] || {
                exegese: `A investigação exegética sobre "${temaBusca}" no nível ${mode.toUpperCase()} revela uma estrutura semântica profunda nos originais bíblicos, conectando este tema ao cerne da revelação progressiva das Escrituras.`,
                mensagem: `O tema "${temaBusca}" convida o leitor a uma reflexão prática sobre sua caminhada cristã, exigindo uma aplicação que harmonize a doutrina bíblica com a vida cotidiana.`
            };

            let etapas = ["Análise de Texto", "Contexto Histórico", "Evidências", "Validação", "Síntese Final"];
            if (mode === 'exegetica') etapas = ["Texto Original", "Morfologia", "Sintaxe", "Léxico", "Exegese"];
            if (mode === 'pro') etapas = ["Crítica Textual", "Gramática", "Semântica", "Contexto", "Intertextualidade", "Exegese", "Teologia", "Hermenêutica", "Sistemática", "Validação", "Síntese"];

            return {
                tema: temaBusca,
                modo: mode.toUpperCase(),
                score: 15,
                status: "APROVADO",
                etapas: etapas,
                m03: {
                    titulo: "🔹 M03 — ENTENDIMENTO BÍBLICO (EXEGESE)",
                    conteudo: info.exegese
                },
                m02: {
                    titulo: "🔹 M02 — MENSAGEM (TRANSFORMAÇÃO)",
                    conteudo: info.mensagem
                }
            };
        }
    };
})();
window.M00 = M00;
