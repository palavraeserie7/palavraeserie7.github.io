/**
 * DASHBOARD V9.7 - SISTEMA DE NAVEGAÇÃO BLINDADO
 */

// Função de Navegação (Muda as telas)
function switchTab(view) {
    console.log("Tentando navegar para:", view);
    
    // 1. Lista de todas as telas possíveis
    const views = ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    
    // 2. Esconde todas e desativa o menu
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

    // 3. Mostra a tela desejada
    const target = document.getElementById(view + '-view');
    if (target) {
        target.style.display = 'block';
        console.log("Tela exibida:", view);
    }

    // 4. Marca o botão como ativo
    const btn = document.getElementById('btn-' + view);
    if (btn) btn.classList.add('active');
}

// Função de Pesquisa
async function executeSearchWithMode(mode) {
    const queryInput = document.getElementById("global-search");
    const query = queryInput ? queryInput.value : "";
    
    if (!query || query.length < 2) {
        alert("Por favor, digite sua pergunta teológica primeiro.");
        return;
    }

    // Muda para a tela de resultados imediatamente
    switchTab('consulta');
    
    try {
        const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
        if (d) {
            updateStudyFlow(d.fluxo, d.modo);
            renderDossier(d);
        }
    } catch (e) {
        console.error("Erro na pesquisa:", e);
    }
}

function updateStudyFlow(fluxo, modo) {
    const container = document.getElementById("fluxo-container");
    if(!container) return;
    document.getElementById("fluxo-subtitle").innerText = `Matriz Ativada: ${modo}`;
    container.innerHTML = fluxo.map((item, i) => `
        <div style="background:#111827; padding:12px; margin-bottom:8px; border-radius:8px; border-left:4px solid #00cc66; font-size:0.9rem;">
            <strong style="color:#00cc66;">${item.etapa}:</strong> <span style="color:#C9A84C;">${item.fonte}</span> - ${item.funcao}
        </div>`).join('');
}

function renderDossier(d) {
    const area = document.getElementById("results-area");
    if(!area) return;
    area.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:2px solid #1a202c; font-family:serif;">
            <h1 style="text-align:center;">${d.tema}</h1>
            <div style="background:white; padding:25px; border-left:10px solid #00cc66; margin:20px 0;">
                <h3>${d.m03.titulo}</h3><p>${d.m03.conteudo}</p>
            </div>
            <div style="background:#fffbeb; padding:25px; border-left:10px solid #C9A84C;">
                <h3>${d.m02.titulo}</h3><p>${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <button class="btn-liberado" onclick="switchTab('fluxo')">VER MATRIZ DE EVIDÊNCIAS</button>
            </div>
        </div>`;
}

// Inicialização
window.onload = async () => {
    console.log("Sistema Iniciado");
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user) document.getElementById("user-email").innerText = user.email;
    } catch (e) {
        document.getElementById("user-email").innerText = "Modo Visitante";
    }
};
