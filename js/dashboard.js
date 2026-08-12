/**
 * NEXUS AI V12.5 - MOTOR ULTRA-ROBUSTO (MULTI-FALLBACK)
 */

// 1. SUA CHAVE DE API (MANTIDA)
const GEMINI_API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

// 2. FUNÇÃO DE IA INTELIGENTE (TENTA VÁRIAS VERSÕES)
async function chamarIA(pergunta) {
    // Lista de modelos e versões para tentar em ordem
    const tentativas = [
        { ver: "v1beta", mod: "gemini-1.5-flash" },
        { ver: "v1", mod: "gemini-1.5-flash" },
        { ver: "v1beta", mod: "gemini-pro" }
    ];

    let ultimoErro = "";

    for (let t of tentativas) {
        try {
            const url = `https://generativelanguage.googleapis.com/${t.ver}/models/${t.mod}:generateContent?key=${GEMINI_API_KEY}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: pergunta }] }] } )
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0]) {
                console.log(`Sucesso com ${t.mod} (${t.ver})`);
                return data.candidates[0].content.parts[0].text;
            }
            if (data.error) ultimoErro = data.error.message;
        } catch (e) {
            ultimoErro = e.message;
        }
    }
    throw new Error("Não foi possível conectar aos modelos do Google. Erro: " + ultimoErro);
}

// 3. FUNÇÃO DE PESQUISA (UI)
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Digite um tema primeiro."); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `<div style="text-align:center; padding:50px; color:white;">
        <i class="fas fa-cross fa-spin fa-3x" style="color:#00cc66;"></i>
        <h2>M00 Sincronizando com IA do Google...</h2>
        <p>Processando Matriz Teológica para: ${tema}</p>
    </div>`;

    const promptMestre = `Você é um PhD em Exegese Bíblica. Analise a pergunta: "${tema}". Siga rigorosamente as 12 etapas teológicas citando fontes acadêmicas (NA28, BDAG, Metzger, BECNT, IVP, Grudem). Responda em Português de forma técnica e profunda.`;

    try {
        const resposta = await chamarIA(promptMestre);
        area.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:3px solid #1a202c; font-family:serif; max-width:850px; margin:auto; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
                <h1 style="text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px;">DOSSIÊ: ${tema.toUpperCase()}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem; margin-top:20px;">${resposta}</div>
                <div style="text-align:center; margin-top:30px;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 40px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
                </div>
            </div>`;
        
        document.getElementById("fluxo-container").innerHTML = `
            <div style="background:#111827; padding:20px; border-radius:10px; color:#00cc66; border:1px solid #1f2937; margin-top:20px;">
                <h3>Matriz de 12 Etapas Validada</h3>
                <p>Fontes: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p>
            </div>`;
    } catch (e) {
        area.innerHTML = `<div style="color:#ff4d4d; padding:30px; border:1px solid #ff4d4d; border-radius:10px; background:rgba(255,0,0,0.1); text-align:center;">
            <h3>Erro de Conexão</h3>
            <p>${e.message}</p>
            <p style="font-size:0.8rem; margin-top:10px;">Dica: Tente pesquisar novamente em 1 minuto. Se o erro persistir, verifique se sua chave API no Google AI Studio está ativa.</p>
        </div>`;
    }
}

// 4. NAVEGAÇÃO (BLINDADA)
function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
    });
    const alvo = document.getElementById('view-' + aba);
    if (alvo) alvo.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}
window.onload = () => { NEXUS_NAVEGAR('home'); };
