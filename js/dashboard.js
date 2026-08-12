/**
 * DASHBOARD VIEW CONTROLLER V9.2 (FIXED NAVIGATION)
 * Garante que todos os cliques no menu lateral funcionem perfeitamente.
 */

async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;

        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data && data.books) renderBooks(data.books);
    } catch (e) { console.error("Erro na inicialização:", e); }
}

// FUNÇÃO QUE MUDA AS TELAS (ABAS)
function switchTab(view) {
    // 1. Esconde todas as visualizações
    const views = ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 2. Mostra a visualização selecionada
    const targetId = view + '-view';
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.style.display = 'block';
    } else {
        console.error("Visualização não encontrada:", targetId);
    }

    // 3. Atualiza o estado visual do menu (marca qual está ativo)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Tenta encontrar o botão que foi clicado para marcar como ativo
    const activeBtn = document.getElementById('btn-' + view);
    if (activeBtn) activeBtn.classList.add('active');
}

// FUNÇÃO DE PESQUISA
async function executeSearchWithMode(mode) {
    const queryEl = document.getElementById("global-search");
    const query = queryEl ? queryEl.value : "";
    
    if (!query || query.length < 2) {
        alert("Por favor, digite sua pergunta teológica primeiro.");
        return;
    }

    // Muda para a tela de resultados (consulta)
    switchTab('consulta');

    // Executa a lógica no Orquestrador
    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
    if (!d) return;

    // Atualiza o Fluxo de Estudo
    updateStudyFlow(d.etapas, d.modo);

    // Renderiza o Dossiê
    renderDossier(d);
}

function updateStudyFlow(etapas, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if (!container) return;

    subtitle.innerText = `Etapas automáticas do nível: ${modo}`;
    container.innerHTML = etapas.map((e, i) => `
        <div style="background:#111827; padding:15px; margin-bottom:10px; border-radius:8px; display:flex; gap:15px; border-left:4px solid #00cc66;">
            <span style="font-weight:bold; color:#00cc66;">${(i+1).toString().padStart(2, '0')}</span> 
            <span>${e}</span>
        </div>
    `).join('');
}

function renderDossier(d) {
    const container = document.getElementById("results-area");
    if (!container) return;

    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; border:2px solid #1a202c; font-family:serif; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
            <div style="border-bottom: 4px solid #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.8rem; letter-spacing:5px; color:#4a5568;">ARQUITETURA DE PESQUISA V9.1</h2>
                <h1 style="margin:15px 0; font-size:2.5rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:6px 20px; border-radius:50px; font-size:0.75rem; font-weight:bold; display:inline-block;">
                    NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100 [${d.status}]
                </div>
            </div>
            <div style="margin-bottom:30px; background:white; padding:30px; border-radius:10px; border-left:10px solid #00cc66;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.7;">${d.m03.conteudo}</p>
            </div>
            <div style="margin-bottom:30px; background:#fffbeb; padding:30px; border-radius:10px; border-left:10px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.7; color:#451a03;">${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center;">
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 50px;" onclick="switchTab('fluxo')">VER ETAPAS NO FLUXO</button>
            </div>
        </div>`;
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px; aspect-ratio:2/3; object-fit:cover;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}

async function logout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }

// Inicia o sistema
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
