async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data) renderBooks(data.books);
    } catch (e) { console.error(e); }
}

async function executeSearchWithMode(mode) {
    const query = document.getElementById("global-search").value || "Fé";
    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
    
    // Atualiza o Fluxo de Estudo dinamicamente
    const flowContainer = document.getElementById("fluxo-container");
    const flowSubtitle = document.getElementById("fluxo-subtitle");
    if (flowContainer) {
        flowSubtitle.innerText = `Etapas do nível: ${d.modo}`;
        flowContainer.innerHTML = d.etapas.map((e, i) => `
            <div style="background:#111827; padding:15px; margin-bottom:10px; border-radius:8px; border-left:4px solid #00cc66;">
                <span style="font-weight:bold; color:#00cc66;">${(i+1).toString().padStart(2, '0')}</span> ${e}
            </div>`).join('');
    }

    switchTab('consulta', false);
    renderDossier(d);
}

function renderDossier(d) {
    const container = document.getElementById("results-area");
    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:2px solid #1a202c; font-family:serif;">
            <h1 style="text-align:center; margin:0;">${d.tema}</h1>
            <p style="text-align:center; font-weight:bold; color:#4a5568;">NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100</p>
            <div style="margin:30px 0; padding:20px; border-left:8px solid #00cc66; background:white;">
                <h3>${d.m03.titulo}</h3><p>${d.m03.conteudo}</p>
            </div>
            <div style="margin:30px 0; padding:20px; border-left:8px solid #C9A84C; background:#fffbeb;">
                <h3>${d.m02.titulo}</h3><p>${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center; margin-top:40px;">
                <button class="btn-liberado" onclick="switchTab('fluxo')">VER ETAPAS NO FLUXO</button>
            </div>
        </div>`;
}

function switchTab(view, isManual = true) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'].forEach(id => { 
        const el = document.getElementById(id); if(el) el.style.display = 'none'; 
    });
    const target = { 'home':'home-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
    document.getElementById(target).style.display = 'block';
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
