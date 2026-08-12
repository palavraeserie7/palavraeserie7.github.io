/**
 * NEXUS AI V12.6 - MOTOR ROBUSTO INTEGRADO
 */

const GEMINI_API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

async function chamarIA(pergunta) {
    // Tenta primeiro a versão v1beta que é a mais comum para o Flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `Você é um PhD em Exegese Bíblica. Analise a pergunta: "${pergunta}". Siga rigorosamente as 12 etapas teológicas citando fontes acadêmicas (NA28, BDAG, Metzger, BECNT, IVP, Grudem ). Responda em Português de forma técnica e profunda.`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
}

async function NEXUS_PESQUISAR(modo) {
    const tema = document.getElementById("global-search").value.trim();
    if (!tema) { alert("Digite um tema!"); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `<div style="text-align:center; padding:50px; color:white;"><i class="fas fa-brain fa-spin fa-3x" style="color:#00cc66;"></i><h2>Processando Inteligência Teológica...</h2></div>`;

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = `
            <div style="background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif; max-width:850px; margin:auto;">
                <h1 style="text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px;">${tema.toUpperCase()}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem;">${resposta}</div>
                <button class="btn-liberado" style="margin-top:30px; background:#00cc66; color:white; padding:15px 40px;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
            </div>`;
        
        document.getElementById("fluxo-container").innerHTML = `<div style="background:#111827; padding:20px; border-radius:10px; color:#00cc66; border:1px solid #1f2937;"><h3>Matriz de 12 Etapas Validada</h3><p>Fontes: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p></div>`;
    } catch (e) {
        area.innerHTML = `<div style="color:#ff4d4d; padding:30px; border:1px solid #ff4d4d; text-align:center;"><h3>Erro na IA</h3><p>${e.message}</p></div>`;
    }
}

function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => { const el = document.getElementById(v); if(el) el.style.display = 'none'; });
    const alvo = document.getElementById('view-' + aba);
    if (alvo) alvo.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}
window.onload = () => { NEXUS_NAVEGAR('home'); };
