/**
 * NEXUS AI V14 - VERSÃO COM CHAVE REAL (AIzaSy)
 */

// 1. COLE AQUI A CHAVE QUE COMEÇA COM "AIzaSy"
const CHAVE_MESTRA = "COLE_AQUI_A_CHAVE_QUE_COMECA_COM_AIzaSy"; 

async function chamarIA(pergunta) {
    // Se a chave não começar com AIzaSy, o site já avisa o erro
    if (!CHAVE_MESTRA.startsWith("AIzaSy")) {
        throw new Error("A chave colada está incorreta. Ela deve começar com 'AIzaSy'. A sua começa com '" + CHAVE_MESTRA.substring(0,6) + "'.");
    }

    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + CHAVE_MESTRA;
    
    const prompt = "Você é um PhD em Exegese Bíblica. Analise a pergunta: '" + pergunta + "'. Siga as 12 etapas teológicas citando fontes acadêmicas (NA28, BDAG, Metzger, BECNT, IVP, Grudem ). Responda em Português de forma técnica e profunda.";

    const configuracao = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    };

    const conexao = await fetch(url, configuracao);
    const dados = await conexao.json();

    if (dados.error) { throw new Error(dados.error.message); }
    return dados.candidates[0].content.parts[0].text;
}

async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Digite um tema primeiro!"); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = "<div style='text-align:center; padding:50px; color:white;'><i class='fas fa-cross fa-spin fa-3x' style='color:#00cc66;'></i><h2>M00 Processando Inteligência Real...</h2></div>";

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = "<div style='background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif; max-width:850px; margin:auto;'><h1 style='text-align:center; border-bottom:4px double #1a202c; padding-bottom:15px;'>" + tema.toUpperCase() + "</h1><div style='white-space: pre-wrap; line-height:1.8; font-size:1.1rem;'>" + resposta + "</div><button class='btn-liberado' style='margin-top:30px; background:#00cc66; color:white; padding:15px 40px;' onclick='NEXUS_NAVEGAR(\"fluxo\")'>VER MATRIZ TÉCNICA</button></div>";
        
        document.getElementById("fluxo-container").innerHTML = "<div style='background:#111827; padding:20px; border-radius:10px; color:#00cc66; border:1px solid #1f2937;'><h3>Matriz de 12 Etapas Validada</h3><p>Fontes: NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem.</p></div>";
    } catch (e) {
        area.innerHTML = "<div style='color:#ff4d4d; padding:30px; border:1px solid #ff4d4d; text-align:center;'><h3>Erro de Configuração</h3><p>" + e.message + "</p></div>";
    }
}

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
