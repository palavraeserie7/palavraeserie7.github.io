async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;
    if (typeof M00 !== 'undefined') {
        window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
        renderCamadas(window.libraryData?.camadas);
        const books = await M00.execute('PRO', { userId: user.id });
        renderBooks(books);
    }
}

function switchTab(view, isManual = true) {
    if (isManual) document.getElementById("global-search").value = "";
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const sections = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => { if(document.getElementById(id)) document.getElementById(id).style.display = 'none'; });
    const target = { 'home':'home-view', 'biblioteca':'biblioteca-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view];
    if (document.getElementById(target)) document.getElementById(target).style.display = 'block';
}

async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;
    switchTab('consulta', false);
    const container = document.getElementById("results-area");
    container.innerHTML = `<div style='text-align:center; padding:50px; color:#00cc66;'><i class='fas fa-sync fa-spin'></i> M00 GERANDO DOSSIÊ MASTER V1...</div>`;

    const d = await M00.execute('SENTINELA', { query });
    container.innerHTML = `
        <div style="background:#f8f9fa; color:#1e293b; border-radius:12px; padding:40px; max-width:850px; margin:auto; border:1px solid #e2e8f0; font-family:sans-serif;">
            <div style="border-bottom: 2px solid #00cc66; padding-bottom:15px; margin-bottom:30px; text-align:center;">
                <h1 style="margin:0; font-size:2rem;">DOSSIÊ MASTER: ${d.tema}</h1>
                <span style="color:#64748b; font-size:0.8rem;">ARQUITETURA V7 - PALAVRA & SÉRIE</span>
            </div>

            <div style="margin-bottom:30px; background:white; padding:20px; border-radius:8px; border-left:4px solid #00cc66;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <p style="color:#b45309; font-weight:bold;">${d.m03.originais}</p>
                <p>${d.m03.contexto}</p>
            </div>

            <div style="margin-bottom:30px; background:white; padding:20px; border-radius:8px; border-left:4px solid #C9A84C;">
                <h3 style="color:#C9A84C; margin-top:0;">${d.m02.titulo}</h3>
                <p><i>"${d.m02.hook}"</i></p>
                <p>${d.m02.revelacao}</p>
            </div>

            <div style="background:#0f172a; color:white; padding:30px; border-radius:12px; text-align:center;">
                <h3 style="color:#00cc66; margin-top:0;">Vá mais fundo</h3>
                <p>${d.cta.v1}</p>
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:12px 40px;" onclick="window.location.href='https://dashboard.kiwify.com.br/products'">ACESSAR CONTEÚDO PRO</button>
                <p style="margin-top:15px; font-size:0.8rem; opacity:0.6;">${d.cta.v2}</p>
            </div>
        </div>
    `;
}

function renderCamadas(camadas ) {
    const container = document.getElementById("camadas-container");
    if (!container || !camadas) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.style = "margin-bottom:15px; border:1px solid #1f2937; border-radius:8px; overflow:hidden;";
        let html = `<div style="background:#1f2937; padding:10px;"><h4>${c.nome}</h4></div><table style="width:100%; border-collapse:collapse;">`;
        c.recursos.forEach(r => { html += `<tr><td style="padding:8px; border-bottom:1px solid #1f2937;"><strong>${r.nome}</strong></td><td style="padding:8px; border-bottom:1px solid #1f2937;">${r.resolve}</td></tr>`; });
        html += `</table>`;
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function renderBooks(books) {
    const free = document.getElementById("books-free");
    const pro = document.getElementById("books-pro");
    if (!free || !pro) return;
    free.innerHTML = ""; pro.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div");
        div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h5>${b.title || b.titulo}</h5>`;
        if ((b.level || 1 ) > 1) pro.appendChild(div); else free.appendChild(div);
    });
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
