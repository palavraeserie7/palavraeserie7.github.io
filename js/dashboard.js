async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        const emailEl = document.getElementById("user-email");
        if (emailEl) emailEl.innerText = user.email;

        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data.profile) renderSpiritualProfile(data.profile);
        if (data.books) renderBooks(data.books);

        const lib = await M00.execute('BIBLIOTECA_AVANCADA');
        if (lib.camadas) renderCamadas(lib.camadas);
    } catch (e) { console.error("Erro no Dashboard:", e); }
}

function renderSpiritualProfile(p) {
    const l = document.getElementById("user-level"), f = document.getElementById("stat-faith"), pr = document.getElementById("stat-prayer");
    if (l) l.innerText = `N${p.level || 1}`; if (f) f.innerText = `${p.faith || 15}%`; if (pr) pr.innerText = `${p.prayer || 20}%`;
}

function switchTab(view, isManual = true) {
    if (isManual) { const s = document.getElementById("global-search"); if(s) s.value = ""; }
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const sections = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
    const target = { 'home':'home-view', 'biblioteca':'biblioteca-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
    const targetEl = document.getElementById(target);
    if (targetEl) targetEl.style.display = 'block';
}

async function handleGlobalSearch() {
    const queryEl = document.getElementById("global-search");
    if (!queryEl) return;
    const query = queryEl.value;
    if (query.length < 2) return;

    switchTab('consulta', false);
    const container = document.getElementById("results-area");
    if (!container) return;
    container.innerHTML = `<div style='text-align:center; padding:50px; color:#00cc66;'><i class='fas fa-sync fa-spin'></i> M00 Sintetizando Dossiê...</div>`;

    try {
        const d = await M00.execute('QUERY_THEME', { query });
        if (!d || !d.m03) throw new Error("Falha na síntese");

        container.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; max-width:950px; margin:auto; border:2px solid #1a202c; font-family:serif;">
                <div style="border-bottom: 4px solid #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                    <h1 style="margin:0; font-size:2.5rem; text-transform:uppercase;">${d.tema}</h1>
                    <div style="background:#065f46; color:white; padding:6px 20px; border-radius:50px; font-size:0.75rem; font-weight:bold; display:inline-block;">SENTINELA: ${d.score}/100</div>
                </div>
                <div style="margin-bottom:40px; background:white; padding:30px; border-radius:10px; border-left:10px solid #00cc66;">
                    <h3 style="color:#00cc66;">${d.m03.titulo}</h3>
                    <p style="font-size:1.3rem; color:#b45309; font-weight:bold;">${d.m03.originais}</p>
                    <p style="font-size:1.1rem; line-height:1.7;">${d.m03.conteudo}</p>
                </div>
                <div style="margin-bottom:40px; background:#fffbeb; padding:30px; border-radius:10px; border-left:10px solid #C9A84C;">
                    <h3 style="color:#92400e;">${d.m02.titulo}</h3>
                    <p style="font-size:1.15rem; line-height:1.7;">${d.m02.conteudo}</p>
                </div>
                <div style="background:#0f172a; color:white; padding:40px; border-radius:15px; text-align:center;">
                    <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 60px;" onclick="window.location.href='https://pay.kiwify.com.br/SEU_CHECKOUT'">ACESSAR PRO</button>
                </div>
            </div>`;
    } catch (err ) { container.innerHTML = "<div style='color:red; text-align:center;'>O M00 encontrou um erro na conexão. Tente novamente em instantes.</div>"; }
}

function renderCamadas(c) {
    const container = document.getElementById("camadas-container");
    if (!container || !c) return; container.innerHTML = "";
    c.forEach(cam => {
        const div = document.createElement("div");
        div.style = "margin-bottom:15px; border:1px solid #1f2937; border-radius:8px; overflow:hidden;";
        let h = `<div style="background:#1f2937; padding:10px;"><h4>${cam.nome}</h4></div><table style="width:100%;">`;
        if (cam.recursos) cam.recursos.forEach(r => { h += `<tr><td style="padding:8px;"><strong>${r.nome}</strong></td><td>${r.resolve}</td></tr>`; });
        div.innerHTML = h + `</table>`; container.appendChild(div);
    });
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p || !books) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
