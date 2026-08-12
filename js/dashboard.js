
/**
 * DASHBOARD V10.1 - NAVEGAÇÃO E CONTROLE DE PESQUISA
 */

// Inicialização segura
window.onload = async () => {
    console.log("Sistema Nexus Ativo");
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user) document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD');
        if (data && data.books) renderizarEstante(data.books);
    } catch (e) {
        document.getElementById("user-email").innerText = "Modo Pesquisador";
    }
};

// NAVEGAÇÃO INFALÍVEL
function mudarAba(aba) {
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

// DISPARO DE PESQUISA PROFUNDA
async function executarPesquisa(modo) {
    const input = document.getElementById("global-search");
    const tema = input ? input.value.trim() : "";
    
    if (!tema || tema.length < 2) {
        alert("Por favor, digite um tema teológico na barra superior.");
        return;
    }

    mudarAba('consulta');
    document.getElementById("results-area").innerHTML = `
        <div style="text-align:center; padding:50px; color:#00cc66;">
            <i class="fas fa-cross fa-spin fa-3x"></i>
            <p style="margin-top:20px; color:#f8f4ec;">M00 Orchestrator processando investigação profunda...</p>
        </div>`;

    const d = await M00.execute('EXECUTE_RESEARCH', { query: tema, mode: modo });
    if (d) {
        renderizarDossie(d);
        atualizarFluxo(d.matrizFluxo, d.modo);
    }
}

function atualizarFluxo(matriz, modo) {
    const container = document.getElementById("fluxo-container");
    document.getElementById("fluxo-subtitle").innerText = `Matriz Técnica de Evidências - Nível: ${modo}`;
    container.innerHTML = matriz.map(item => `
        <div style="background:#111827; padding:12px; margin-bottom:8px; border-radius:8px; border-left:4px solid #00cc66; font-size:0.85rem;">
            <strong style="color:#00cc66;">${item.etapa}:</strong> <span style="color:#C9A84C;">${item.fonte}</span> - ${item.funcao}
        </div>`).join('');
}

function renderizarDossie(d) {
    document.getElementById("results-area").innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:3px solid #1a202c; font-family:serif; max-width:850px; margin:auto; box-shadow:0 20px 40px rgba(0,0,0,0.5);">
            <div style="border-bottom:4px double #1a202c; text-align:center; padding-bottom:20px; margin-bottom:30px;">
                <h1 style="font-size:2.8rem; margin:0;">${d.tema}</h1>
                <span style="background:#065f46; color:white; padding:5px 15px; border-radius:20px; font-size:0.8rem;">SENTINELA: ${d.score}/100 [APROVADO]</span>
            </div>
            <div style="background:white; padding:25px; border-left:12px solid #00cc66; margin-bottom:25px;">
                <h3 style="color:#00cc66; margin-top:0;">M03 — INVESTIGAÇÃO EXEGÉTICA</h3>
                <div style="line-height:1.8; font-size:1.1rem;">${d.m03.conteudo.replace(/\n/g, '  
')}</div>
            </div>
            <div style="background:#fffbeb; padding:25px; border-left:12px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">M02 — SÍNTESE E MENSAGEM</h3>
                <p style="line-height:1.8; font-size:1.1rem; font-style:italic;">${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center; margin-top:30px;">
                <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 40px;" onclick="mudarAba('fluxo')">VER MATRIZ DE FONTES</button>
            </div>
        </div>`;
}

function renderizarEstante(books) {
    const grid = document.getElementById("books-grid");
    if(!grid) return;
    grid.innerHTML = books.map(b => `
        <div class="book-card">
            <img src="${b.capa || 'https://via.placeholder.com/150'}">
            <h4>${b.titulo || b.title}</h4>
        </div>` ).join('');
}

async function fazerLogout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
