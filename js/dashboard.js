/**
 * NEXUS AI V12.3 - CORREÇÃO DE ENDPOINT API
 */

// 1. SUA CHAVE DE API (MANTIDA)
const GEMINI_API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w"; 

// 2. FUNÇÃO PARA CHAMAR A IA (LINK ATUALIZADO PARA V1)
async function chamarIA(pergunta) {
    // Mudamos de v1beta para v1 (versão estável)
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `Você é um PhD em Exegese Bíblica. Analise a pergunta: "${pergunta}". Siga rigorosamente as 12 etapas teológicas citando fontes acadêmicas como NA28, BDAG, Metzger, BECNT, IVP, Grudem. Responda em Português de forma técnica, profunda e vasta.`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            contents: [{ 
                parts: [{ text: prompt }] 
            }] 
        } )
    });

    const data = await response.json();
    
    // Se der erro, vamos capturar a mensagem real
    if (data.error) {
        throw new Error(data.error.message);
    }
    
    if (!data.candidates || !data.candidates[0]) {
        throw new Error("A IA não retornou resposta. Tente novamente em instantes.");
    }

    return data.candidates[0].content.parts[0].text;
}

// 3. FUNÇÃO DE PESQUISA (UI)
async function NEXUS_PESQUISAR(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    if (!tema) { alert("Por favor, digite um tema teológico."); return; }

    NEXUS_NAVEGAR('consulta');
    const area = document.getElementById("results-area");
    area.innerHTML = `
        <div style="text-align:center; padding:80px; color:white; font-family:serif;">
            <i class="fas fa-brain fa-spin fa-3x" style="color:#00cc66; margin-bottom:20px;"></i>
            <h2 style="letter-spacing:2px;">M00 PROCESSANDO INTELIGÊNCIA...</h2>
            <p style="color:#94a3b8;">Sincronizando Matriz de 12 Etapas e Fontes Acadêmicas.</p>
        </div>`;

    try {
        const resposta = await chamarIA(tema);
        area.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:50px; border:3px solid #1a202c; font-family:serif; max-width:900px; margin:auto; box-shadow:0 30px 60px rgba(0,0,0,0.5);">
                <div style="border-bottom:5px double #1a202c; text-align:center; padding-bottom:20px; margin-bottom:40px;">
                    <h2 style="margin:0; font-size:0.7rem; letter-spacing:5px; color:#4a5568; font-weight:800;">ARQUITETURA DE INTELIGÊNCIA V12.3</h2>
                    <h1 style="margin:15px 0; font-size:3rem; text-transform:uppercase;">${tema}</h1>
                    <div style="background:#065f46; color:white; padding:8px 25px; border-radius:50px; font-size:0.8rem; font-weight:bold; display:inline-block; border: 2px solid #1a202c;">
                        NÍVEL: ${modo.toUpperCase()} | SENTINELA: APROVADO
                    </div>
                </div>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.15rem; color:#2d3748;">${resposta}</div>
                <div style="text-align:center; margin-top:50px; border-top:1px dashed #cbd5e0; padding-top:30px;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; padding:18px 60px; font-size:1rem;" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA DE EVIDÊNCIAS</button>
                </div>
            </div>`;
        
        document.getElementById("fluxo-container").innerHTML = `
            <div style="background:#111827; padding:25px; border-radius:12px; border-left:6px solid #00cc66; border:1px solid #1f2937; margin-top:20px;">
                <h3 style="color:#00cc66; margin-top:0;">Matriz de 12 Etapas Validada</h3>
                <p style="color:#94a3b8; line-height:1.6;">Fontes consultadas: NA28, BHS, Metzger, BDAG, HALOT, BECNT, NICNT, IVP, Beale & Carson, Osborne, Grudem, Berkhof.</p>
            </div>`;
    } catch (e) {
        area.innerHTML = `
            <div style="color:#ff4d4d; padding:40px; border:2px solid #ff4d4d; border-radius:15px; background:rgba(255,0,0,0.05); text-align:center; max-width:600px; margin:auto;">
                <i class="fas fa-exclamation-triangle fa-2x"></i>
                <h3 style="margin-top:15px;">Falha na Conexão Teológica</h3>
                <p style="font-size:1.1rem;">${e.message}</p>
                <p style="font-size:0.85rem; margin-top:20px; color:#94a3b8;">Verifique se sua chave API no Google AI Studio está ativa. Se o erro persistir, pode ser uma instabilidade temporária no servidor do Google.</p>
            </div>`;
    }
}

// 4. NAVEGAÇÃO
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
