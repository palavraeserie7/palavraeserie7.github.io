async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        renderBooks(data.books);
        const modes = await M00.execute('GET_RESEARCH_MODES');
        renderResearchModes(modes);
    } catch (e) { console.error(e); }
}

function renderResearchModes(modes) {
    const container = document.getElementById("research-modes-container");
    if (!container) return; container.innerHTML = "";
    modes.forEach(m => {
        const div = document.createElement("div");
        div.className = "mode-card";
        div.style = "background:#111827; border:1px solid #1f2937; padding:20px; border-radius:10px; cursor:pointer; transition:0.3s;";
        div.innerHTML = `<h4 style="color:#00cc66; margin:0 0 10px 0;">${m.nome}</h4><p style="font-size:0.8rem; color:#94a3b8; margin:0;">${m.desc}</p>`;
        div.onclick = () => executeSearch(m.id);
        container.appendChild(div);
    });
}

async function executeSearch(mode) {
    const query = document.getElementById("global-search").value || "Fé";
    switchTab('consulta', false);
    const container = document.getElementById("results-area");
    container.innerHTML = `<div style='text-align:center; padding:50px; color:#00cc66;'>M00 EXECUTANDO PESQUISA [${mode.toUpperCase()}]...</div>`;

    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
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
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; font-family:sans-serif; font-size:0.8rem;">
                <div style="background:#f1f5f9; padding:15px; border-radius:8px;">
                    <strong>Etapas Executadas:</strong>  
${d.etapas.join(', ')}
                </div>
                <div style="background:#f1f5f9; padding:15px; border-radius:8px;">
                    <strong>Fontes Utilizadas:</strong>  
${d.fontes.join(', ')}
                </div>
            </div>
            <div style="text-align:center; margin-top:40px;"><button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 50px;">${d.cta}</button></div>
        </div>`;
}

function switchTab(view, isManual = true) {
    if (isManual) document.getElementById("global-search").value = "";
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    ['home-view', 'pesquisa-view', 'fluxo-view', 'estante-view', 'consulta-view'].forEach(id => { 
        const el = document.getElementById(id); if(el) el.style.display = 'none'; 
    });
    const target = { 'home':'home-view', 'pesquisa':'pesquisa-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
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
