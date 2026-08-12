
/**
 * NEXUS AI V12.1 - DIAGNÓSTICO ATIVO
 */

// 1. SUBSTITUA PELA CHAVE QUE COMEÇA COM "AIzaSy"
const GEMINI_API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

async function chamarIA(pergunta) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `Analise a pergunta teológica: "${pergunta}". Siga as 12 etapas teológicas citando fontes acadêmicas (NA28, BDAG, Metzger, etc. ). Responda em Português de forma profunda.`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });

    const data = await response.json();
    
    // Se a API retornar erro, vamos mostrar o que é
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    return data.candidates[0].content.parts[0].text;
}

async function NEXUS_PESQUISAR(modo) {
    const tema = document.getElementById("global-search").value;
    if (!tema) return;

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = "<h2>IA Teológica Processando...</h2>";

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = `
            <div style="background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif;">
                <h1 style="text-align:center;">${tema.toUpperCase()}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem; margin-top:20px;">${resposta}</div>
                <button class="btn-liberado" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
            </div>`;
        
        // Preenche a matriz de fontes
        document.getElementById("fluxo-container").innerHTML = `
            <div style="background:#111827; padding:20px; border-radius:10px; color:#00cc66;">
                <h3>Matriz de 12 Etapas Ativada</h3>
                <p>Fontes: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p>
            </div>`;
    } catch (e) {
        // Mostra o erro real para sabermos o que corrigir
        area.innerHTML = `<div style="color:red; padding:20px; border:1px solid red;">
            <h3>Erro na Inteligência:</h3>
            <p>${e.message}</p>
            <p>Verifique se sua chave API começa com "AIzaSy" e se foi colada corretamente.</p>
        </div>`;
    }
}

function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => document.getElementById(v).style.display = 'none');
    document.getElementById('view-' + aba).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (document.getElementById('btn-' + aba)) document.getElementById('btn-' + aba).classList.add('active');
}
window.onload = () => { NEXUS_NAVEGAR('home'); };
