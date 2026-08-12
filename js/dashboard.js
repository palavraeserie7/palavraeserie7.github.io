async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;

        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data) {
            document.getElementById("stat-faith").innerText = data.profile.faith + "%";
            document.getElementById("stat-prayer").innerText = data.profile.prayer + "%";
            renderBooks(data.books);
        }
        const lib = await M00.execute('BIBLIOTECA_AVANCADA');
        renderCamadas(lib.camadas);
    } catch (e) { console.error(e); }
}

async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;
    
    switchTab('consulta', false);
    const container = document.getElementById("results-area");
    container.innerHTML = "<div style='text-align:center; padding:50px; color:#00cc66;'>Sintetizando Dossiê...</div>";

    const d = await M00.execute('QUERY_THEME', { query });
    if (!d) { container.innerHTML = "Erro ao processar consulta."; return; }

    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:2px solid #1a202c; font-family:serif;">
            <h1 style="text-align:center;">${d.tema}</h1>
            <div style="text-align:center; margin-bottom:30px;"><span style="background:#065f46; color:white; padding:5px 15px; border-radius:20px;">SENTINELA: ${d.score}/100</span></div>
            <div style="background:white; padding:25px; border-radius:10px; border-left:10px solid #00cc66; margin-bottom:25px;">
                <h3>${d.m03.titulo}</h3>
                <p style="color:#b45309; font-weight:bold;">${d.m03.originais}</p>
                <p>${d.m03.conteudo}</p>
            </div>
            <div style="background:#fffbeb; padding:25px; border-radius:10px; border-left:10px solid #C9A84C; margin-bottom:25px;">
                <h3>${d.m02.titulo}</h3>
                <p>${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center; background:#0f172a; padding:30px; border-radius:15px; color:white;">
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 50px;" onclick="window.location.href='https://pay.kiwify.com.br/SEU_CHECKOUT'">ACESSAR PRO</button>
            </div>
        </div>`;
}

function switchTab(view, isManual = true ) {
    if (isManual) document.getElementById("global-search").value = "";
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const sections = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
    const target = { 'home':'home-view', 'biblioteca':'biblioteca-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
    document.getElementById(target).style.display = 'block';
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}

function renderCamadas(c) {
    const container = document.getElementById("camadas-container");
    if (!container || !c) return; container.innerHTML = "";
    c.forEach(cam => {
        const div = document.createElement("div");
        div.style = "margin-bottom:15px; border:1px solid #1f2937; border-radius:8px; overflow:hidden;";
        let h = `<div style="background:#1f2937; padding:10px;"><h4>${cam.nome}</h4></div><table style="width:100%;">`;
        cam.recursos.forEach(r => { h += `<tr><td style="padding:8px;"><strong>${r.nome}</strong></td><td>${r.resolve}</td></tr>`; });
        div.innerHTML = h + `</table>`; container.appendChild(div);
    });
}
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
