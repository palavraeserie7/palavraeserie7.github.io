// ==========================================
// ORQUESTRADOR M00 INTEGRADO (CÉREBRO)
// ==========================================
const M00 = {
    async execute(action, params = {}) {
        if (action === 'EXECUTE_RESEARCH') {
            const T = params.query.toUpperCase();
            return {
                tema: T, modo: params.mode.toUpperCase(), score: 15,
                m03: { titulo: "EXEGESE PROFUNDA", conteudo: "Análise rica sobre " + T + " nos originais grego e hebraico." },
                m02: { titulo: "MENSAGEM PRÁTICA", conteudo: "Aplicação teológica para a vida cristã sobre " + T + "." },
                matrizFluxo: [
                    {etapa: "Texto", fonte: "NA28/BHS", funcao: "Originais"},
                    {etapa: "Léxico", fonte: "BDAG/HALOT", funcao: "Semântica"},
                    {etapa: "Síntese", fonte: "M00", funcao: "Conclusão"}
                ]
            };
        }
        return null;
    }
};

// ==========================================
// CONTROLADOR DE NAVEGAÇÃO (MENU)
// ==========================================
function NEXUS_NAVEGAR(aba) {
    console.log("Navegando para:", aba);
    const secoes = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    secoes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    const alvo = document.getElementById('view-' + aba);
    if (alvo) alvo.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}

async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value : "";
    if (!tema) { alert("Digite um tema primeiro!"); return; }
    
    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = "<h2>Processando Inteligência Teológica...</h2>";
    
    const d = await M00.execute('EXECUTE_RESEARCH', { query: tema, mode: modo });
    if (d) {
        area.innerHTML = `
            <div style="background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif;">
                <h1 style="text-align:center;">${d.tema}</h1>
                <div style="background:white; padding:20px; border-left:10px solid #00cc66; margin:20px 0;">
                    <h3>${d.m03.titulo}</h3><p>${d.m03.conteudo}</p>
                </div>
                <div style="background:#fffbeb; padding:20px; border-left:10px solid #C9A84C;">
                    <h3>${d.m02.titulo}</h3><p>${d.m02.conteudo}</p>
                </div>
                <button class="btn-liberado" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
            </div>`;
        
        const fluxoCont = document.getElementById("fluxo-container");
        if (fluxoCont) {
            fluxoCont.innerHTML = d.matrizFluxo.map(i => `
                <div style="background:#111827; padding:10px; margin-bottom:5px; border-left:4px solid #00cc66; font-size:0.8rem; color:white;">
                    <strong>${i.etapa}:</strong> ${i.fonte} - ${i.funcao}
                </div>`).join('');
        }
    }
}
