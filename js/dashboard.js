/**
 * NEXUS AI V12 - INTEGRAÇÃO COM INTELIGÊNCIA ARTIFICIAL REAL
 */

// 1. CONFIGURAÇÃO DA IA (Obtenha sua chave em: https://aistudio.google.com/app/apikey )
const GEMINI_API_KEY = "COLE_SUA_CHAVE_AQUI"; 

// 2. MATRIZ DE ETAPAS E FONTES
const MATRIZ_FONTES = {
    1: "Texto (NA28/BHS/Septuaginta)",
    2: "Crítica Textual (Metzger)",
    3: "Gramática (Wallace/Joüon)",
    4: "Léxico (BDAG/HALOT)",
    5: "Significado Teológico (NIDNTTE/TDNT)",
    6: "Contexto Literário (BECNT/NICNT/NICOT)",
    7: "Contexto Histórico (IVP Background)",
    8: "Relação Canônica (Beale/Vos)",
    9: "Hermenêutica (Osborne/Carson)",
    10: "Teologia Sistemática (Grudem/Berkhof)",
    11: "Comparação de Fontes",
    12: "Síntese Final"
};

// 3. FUNÇÃO PARA CHAMAR A IA
async function chamarIA(pergunta) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `
        Você é um PhD em Exegese Bíblica e Teologia Sistemática. 
        Analise a seguinte pergunta: "${pergunta}".
        Siga RIGOROSAMENTE estas 12 etapas teológicas, citando as fontes acadêmicas indicadas:
        1. Texto: Use NA28 (se NT ) ou BHS (se AT).
        2. Crítica Textual: Cite Metzger.
        3. Gramática: Cite Wallace ou Joüon.
        4. Palavras-Chave: Use BDAG (grego) ou HALOT (hebraico).
        5. Significado Teológico: Use NIDNTTE ou TDOT.
        6. Contexto Literário: Use comentários como BECNT ou NICOT.
        7. Contexto Histórico: Use IVP Background Commentary.
        8. Relação Canônica: Use Beale & Carson.
        9. Hermenêutica: Use Osborne.
        10. Teologia: Use Grudem ou Berkhof.
        11. Comparação: Identifique consensos e divergências.
        12. Síntese: Conclusão exegética final.

        Responda em Português, de forma profunda, técnica e vasta.
    `;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// 4. FUNÇÃO DE PESQUISA ATUALIZADA
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Digite um tema primeiro."); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `<div style="text-align:center; padding:50px;"><i class="fas fa-brain fa-spin fa-3x" style="color:#00cc66;"></i><p style="color:white; margin-top:20px;">IA Teológica processando as 12 etapas...</p></div>`;

    try {
        const respostaIA = await chamarIA(tema);
        
        area.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:3px solid #1a202c; font-family:serif; max-width:900px; margin:auto;">
                <h1 style="text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px;">DOSSIÊ: ${tema.toUpperCase()}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem; margin-top:20px;">
                    ${respostaIA}
                </div>
                <div style="text-align:center; margin-top:30px;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 40px;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
                </div>
            </div>`;

        // Preenche o fluxo de estudo com as fontes
        const fluxoCont = document.getElementById("fluxo-container");
        if (fluxoCont) {
            fluxoCont.innerHTML = `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:15px; margin-top:20px;">` +
                Object.entries(MATRIZ_FONTES).map(([id, info]) => `
                    <div style="background:#111827; padding:15px; border-radius:10px; border-left:4px solid #00cc66; border:1px solid #1f2937;">
                        <div style="font-size:0.7rem; color:#00cc66; font-weight:bold;">ETAPA ${id}</div>
                        <div style="color:#C9A84C; font-weight:bold; margin:5px 0;">${info}</div>
                    </div>
                `).join('') + `</div>`;
        }
    } catch (e) {
        area.innerHTML = `<p style="color:red; text-align:center;">Erro ao conectar com a IA. Verifique sua chave API.</p>`;
    }
}

// Navegação básica
function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => { document.getElementById(v).style.display = 'none'; });
    document.getElementById('view-' + aba).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (document.getElementById('btn-' + aba)) document.getElementById('btn-' + aba).classList.add('active');
}
window.onload = () => { NEXUS_NAVEGAR('home'); };
