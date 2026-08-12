async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data && data.books) renderBooks(data.books);
    } catch (e) { console.error(e); }
}
function switchTab(view) {
    const views = ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    views.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
    const target = document.getElementById(view + '-view');
    if (target) target.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + view);
    if (btn) btn.classList.add('active');
}
async function executeSearchWithMode(mode) {
    const query = document.getElementById("global-search").value;
    if (!query || query.length < 2) { alert("Digite sua pergunta primeiro."); return; }
    switchTab('consulta');
    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
    if (!d) return;
    updateStudyFlow(d.etapas, d.modo);
    renderDossier(d);
}
function updateStudyFlow(etapas, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    subtitle.innerText = `Etapas do nível: ${modo}`;
    container.innerHTML = etapas.map((e, i) => `
        <div style="background:#111827; padding:15px; margin-bottom:10px; border-radius:8px; border-left:4px solid #00cc66;">
            <span style="font-weight:bold; color:#00cc66;">${(i+1).toString().padStart(2, '0')}</span> ${e}
        </div>`).join('');
}
function renderDossier(d) {
    const container = document.getElementById("results-area");
    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; border:2px solid #1a202c; font-family:serif;">
            <h1 style="text-align:center; text-transform:uppercase;">${d.tema}</h1>
            <p style="text-align:center; font-weight:bold;">NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100</p>
            <div style="margin:30px 0; padding:25px; background:white; border-left:10px solid #00cc66;">
                <h3 style="color:#00cc66;">${d.m03.titulo}</h3><p>${d.m03.conteudo}</p>
            </div>
            <div style="margin:30px 0; padding:25px; background:#fffbeb; border-left:10px solid #C9A84C;">
                <h3 style="color:#92400e;">${d.m02.titulo}</h3><p>${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center;"><button class="btn-liberado" onclick="switchTab('fluxo')">VER ETAPAS NO FLUXO</button></div>
        </div>`;
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
async function logout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
