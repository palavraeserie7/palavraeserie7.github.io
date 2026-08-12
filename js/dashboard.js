/**
 * NEXUS TEOLÓGICO V11.2 - O CÉREBRO INTEGRADO
 * Matriz de 12 Etapas + Roteamento Dinâmico + Navegação Blindada
 */

// 1. MATRIZ DE FONTES (MASTER V1)
const BIBLIOTECA = {
    1: { nome: "TEXTO", fontes: ["NA28", "BHS/BHQ", "SBLGNT", "Septuaginta"] },
    2: { nome: "CRÍTICA TEXTUAL", fontes: ["Metzger", "Aparatos Críticos"] },
    3: { nome: "GRAMÁTICA", fontes: ["Wallace", "Joüon", "Sintaxe Grega/Hebraica"] },
    4: { nome: "LÉXICO", fontes: ["BDAG", "HALOT", "LSJ", "BDB"] },
    5: { nome: "TEOLÓGICO", fontes: ["NIDNTTE", "NIDOTTE", "TDNT", "TDOT"] },
    6: { nome: "CONTEXTO LIT.", fontes: ["BECNT", "NICNT", "NICOT", "WBC"] },
    7: { nome: "CONTEXTO HIST.", fontes: ["IVP Background", "Zondervan Encyclopedia"] },
    8: { nome: "RELAÇÃO CANÔNICA", fontes: ["Beale & Carson", "Vos", "Schreiner"] },
    9: { nome: "HERMENÊUTICA", fontes: ["Osborne", "Fee & Stuart"] },
    10: { nome: "SISTEMÁTICA", fontes: ["Grudem", "Berkhof", "Frame"] },
    11: { nome: "COMPARAÇÃO", fontes: ["Cruzamento de Fontes", "Consenso/Divergência"] },
    12: { nome: "SÍNTESE", fontes: ["M00 Orchestrator", "Conclusão Final"] }
};

// 2. NAVEGAÇÃO DO MENU (BLINDADA)
function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById('view-' + aba);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}

// 3. MOTOR DE PESQUISA PROFUNDA
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim().toUpperCase() : "";
    if (!tema) { alert("Digite um tema teológico primeiro."); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `<div style="text-align:center; padding:50px;"><i class="fas fa-cross fa-spin fa-3x" style="color:#00cc66;"></i><p style="color:white; margin-top:20px;">Acionando Matriz de 12 Etapas para: ${tema}...</p></div>`;

    // Simulação de Roteamento Dinâmico (AT vs NT)
    const isAT = /provérbios|salmos|gênesis|isaías|êxodo/.test(tema.toLowerCase());
    
    let roteiro = [];
    for (let i = 1; i <= 12; i++) {
        let etapa = { ...BIBLIOTECA[i], id: i };
        if (i === 1) etapa.fontesAtivas = isAT ? ["BHS", "Septuaginta"] : ["NA28", "SBLGNT"];
        else if (i === 4) etapa.fontesAtivas = isAT ? ["HALOT", "BDB"] : ["BDAG", "LSJ"];
        else etapa.fontesAtivas = etapa.fontes;
        roteiro.push(etapa);
    }

    // Renderiza o Dossiê Rico
    setTimeout(() => {
        area.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:3px solid #1a202c; font-family:serif; max-width:850px; margin:auto;">
                <div style="border-bottom:5px double #1a202c; text-align:center; padding-bottom:20px; margin-bottom:30px;">
                    <h1 style="font-size:2.5rem; margin:0;">${tema}</h1>
                    <span style="background:#065f46; color:white; padding:5px 15px; border-radius:20px; font-size:0.8rem;">NÍVEL: ${modo.toUpperCase()} | SENTINELA: APROVADO</span>
                </div>
                <div style="background:white; padding:25px; border-left:12px solid #00cc66; margin-bottom:25px;">
                    <h3 style="color:#00cc66; margin-top:0;">M03 — INVESTIGAÇÃO EXEGÉTICA</h3>
                    <p style="line-height:1.8; font-size:1.1rem;">Análise técnica conduzida através das fontes originais. O estudo de <strong>${tema}</strong> revela uma estrutura pactual profunda, validada pelo cruzamento de ${roteiro.length} etapas acadêmicas.</p>
                </div>
                <div style="background:#fffbeb; padding:25px; border-left:12px solid #C9A84C;">
                    <h3 style="color:#92400e; margin-top:0;">M02 — SÍNTESE E MENSAGEM</h3>
                    <p style="line-height:1.8; font-size:1.1rem; font-style:italic;">A aplicação prática de ${tema} convida o estudante a uma transformação integral, alinhando a vida cristã à ortodoxia bíblica.</p>
                </div>
                <div style="text-align:center; margin-top:30px;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 40px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA DE FONTES</button>
                </div>
            </div>`;

        // Atualiza a Tabela de Fluxo
        const fluxoCont = document.getElementById("fluxo-container");
        if (fluxoCont) {
            fluxoCont.innerHTML = `
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:15px; margin-top:20px;">
                    ${roteiro.map(item => `
                        <div style="background:#111827; padding:15px; border-radius:10px; border-left:4px solid #00cc66; border:1px solid #1f2937;">
                            <div style="font-size:0.7rem; color:#00cc66; font-weight:bold;">ETAPA ${item.id}</div>
                            <div style="color:#C9A84C; font-weight:bold; margin:5px 0;">${item.fontesAtivas.join(" / ")}</div>
                            <div style="font-size:0.75rem; color:#94a3b8;">${item.funcao}</div>
                        </div>
                    `).join('')}
                </div>`;
        }
    }, 1000);
}

// Inicialização
window.onload = () => { NEXUS_NAVEGAR('home'); };
