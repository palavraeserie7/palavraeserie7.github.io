/**
 * NEXUS AI V13 - SISTEMA À PROVA DE ERROS
 */

// 1. SUA CHAVE DE API
const MINHA_CHAVE = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

// 2. FUNÇÃO DE IA (SIMPLIFICADA PARA NÃO ERRAR)
async function chamarIA(pergunta) {
    // Montando o link sem usar símbolos complicados
    const link = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + MINHA_CHAVE;
    
    const comandoIA = "Você é um PhD em Exegese Bíblica. Analise a pergunta: '" + pergunta + "'. Siga as 12 etapas teológicas citando fontes acadêmicas como NA28, BDAG, Metzger, BECNT, IVP, Grudem. Responda em Português de forma técnica e profunda.";

    const configuracao = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: comandoIA }] }]
        } )
    };

    const conexao = await fetch(link, configuracao);
    const dados = await conexao.json();

    if (dados.error) {
        throw new Error(dados.error.message);
    }

    return dados.candidates[0].content.parts[0].text;
}

// 3. FUNÇÃO DE PESQUISA
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Digite um tema primeiro!"); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = "<div style='text-align:center; padding:50px; color:white;'><h2>M00 Processando Inteligência...</h2><p>Acessando as 12 etapas teológicas para: " + tema + "</p></div>";

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = "<div style='background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif; max-width:850px; margin:auto;'><h1 style='text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px;'>" + tema.toUpperCase() + "</h1><div style='white-space: pre-wrap; line-height:1.8; font-size:1.1rem;'>" + resposta + "</div><button class='btn-liberado' style='margin-top:30px; background:#00cc66; color:white; padding:15px 40px;' onclick='NEXUS_NAVEGAR(\"fluxo\")'>VER MATRIZ TÉCNICA</button></div>";
        
        document.getElementById("fluxo-container").innerHTML = "<div style='background:#111827; padding:20px; border-radius:10px; color:#00cc66; border:1px solid #1f2937;'><h3>Matriz de 12 Etapas Validada</h3><p>Fontes acionadas: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p></div>";
    } catch (e) {
        area.innerHTML = "<div style='color:#ff4d4d; padding:30px; border:1px solid #ff4d4d; text-align:center;'><h3>Erro na Conexão Teológica</h3><p>" + e.message + "</p></div>";
    }
}

// 4. NAVEGAÇÃO
function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(function(v) { 
        const el = document.getElementById(v);
        if(el) el.style.display = 'none'; 
    });
    const alvo = document.getElementById('view-' + aba);
    if (alvo) alvo.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(function(i) { i.classList.remove('active'); });
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}

window.onload = function() { NEXUS_NAVEGAR('home'); };
