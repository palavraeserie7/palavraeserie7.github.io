/**
 * NEXUS AI V12.4 - VERSÃO ESTÁVEL DEFINITIVA
 */

// 1. SUA CHAVE DE API (MANTIDA)
const GEMINI_API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

// 2. FUNÇÃO DE IA (USANDO V1 ESTÁVEL)
async function chamarIA(pergunta) {
    // Forçando o uso da v1 estável para evitar o erro "Not Found"
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `Você é um PhD em Exegese Bíblica. Analise: "${pergunta}". Siga as 12 etapas teológicas citando fontes acadêmicas (NA28, BDAG, Metzger, BECNT, IVP, Grudem ). Responda em Português de forma técnica e profunda.`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    return data.candidates[0].content.parts[0].text;
}

// 3. FUNÇÃO DE PESQUISA
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Digite um tema primeiro."); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `<div style="text-align:center; padding:50px; color:white;">
        <i class="fas fa-cross fa-spin fa-3x" style="color:#00cc66;"></i>
        <h2>M00 Processando Inteligência Real...</h2>
        <p>Acessando Matriz Acadêmica para: ${tema}</p>
    </div>`;

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:2px solid #1a202c; font-family:serif; max-width:850px; margin:auto;">
                <h1 style="text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px; text-transform:uppercase;">${tema}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem; margin-top:20px;">${resposta}</div>
                <div style="text-align:center; margin-top:30px;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 40px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
                </div>
            </div>`;
        
        document.getElementById("fluxo-container").innerHTML = `
            <div style="background:#111827; padding:20px; border-radius:10px; color:#00cc66; border:1px solid #1f2937;">
                <h3>Matriz de 12 Etapas Validada (V1)</h3>
                <p>Fontes: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p>
            </div>`;
    } catch (e) {
        area.innerHTML = `<div style="color:#ff4d4d; padding:30px; border:1px solid #ff4d4d; border-radius:10px; background:rgba(255,0,0,0.1); text-align:center;">
            <h3>Erro de Sincronização</h3>
            <p>${e.message}</p>
            <p style="font-size:0.8rem; margin-top:10px;">Se o erro ainda citar "v1beta", limpe o cache do seu navegador (CTRL + F5).</p>
        </div>`;
    }
}

// 4. NAVEGAÇÃO
function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => { document.getElementById(v).style.display = 'none'; });
    const alvo = document.getElementById('view-' + aba);
    if (alvo) alvo.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}
window.onload = () => { NEXUS_NAVEGAR('home'); };
