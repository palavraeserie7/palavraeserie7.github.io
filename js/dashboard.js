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
    } catch (e) { console.error("Erro na inicialização:", e); }
}

async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;
    switchTab('consulta', false);
    const container = document.getElementById("results-area");
    container.innerHTML = "<div style='text-align:center; padding:50px; color:#00cc66;'><i class='fas fa-sync fa-spin'></i> M00 SINTETIZANDO DOSSIÊ EXEGÉTICO...</div>";

    const d = await M00.execute('QUERY_THEME', { query });
    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; border:2px solid #1a202c; font-family:serif; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
            <div style="border-bottom: 4px solid #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.8rem; letter-spacing:5px; color:#4a5568;">ARQUITETURA MASTER V1</h2>
                <h1 style="margin:15px 0; font-size:3rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:6px 20px; border-radius:50px; font-size:0.75rem; font-weight:bold; display:inline-block;">SENTINELA: ${d.score}/100 [${d.status}]</div>
            </div>
            <div style="margin-bottom:40px; background:white; padding:30px; border-radius:10px; border-left:10px solid #00cc66;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <p style="font-size:1.4rem; color:#b45309; font-weight:bold; margin:20px 0;">${d.m03.originais}</p>
                <p style="font-size:1.25rem; line-height:1.8;">${d.m03.conteudo}</p>
            </div>
            <div style="margin-bottom:40px; background:#fffbeb; padding:30px; border-radius:10px; border-left:10px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02.titulo}</h3>
                <p style="font-size:1.25rem; line-height:1.8; color:#451a03;">${d.m02.conteudo}</p>
            </div>
            <div style="margin-top:40px;">
                <h4 style="border-bottom:1px solid #1a202c; padding-bottom:10px;">RECURSOS ACADÊMICOS RECOMENDADOS</h4>
                <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:15px; margin-top:20px;">
                    ${d.camadas.map(c => `<div style="background:#f1f5f9; padding:10px; border-radius:5px; font-size:0.7rem;"><strong>${c.nome}</strong>  
${c.recursos[0].nome}</div>`).join('')}
                </div>
            </div>
            <div style="background:#0f172a; color:white; padding:40px; border-radius:15px; text-align:center; margin-top:50px;">
                <p style="font-size:1.1rem; margin-bottom:30px;">${d.cta.v1}</p>
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 60px; font-size:1.1rem;" onclick="window.location.href='https://pay.kiwify.com.br/SEU_CHECKOUT'">ACESSAR CONTEÚDO COMPLETO (PRO )</button>
                <p style="margin-top:20px; font-size:0.85rem; opacity:0.6;">${d.cta.v2}</p>
            </div>
        </div>`;
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

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px; aspect-ratio:2/3; object-fit:cover;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}

function switchTab(view, isManual = true) {
    if (isManual) document.getElementById("global-search").value = "";
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const sections = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => { if(document.getElementById(id)) document.getElementById(id).style.display = 'none'; });
    const target = { 'home':'home-view', 'biblioteca':'biblioteca-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
    document.getElementById(target).style.display = 'block';
}

async function logout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
