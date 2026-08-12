/**
 * DASHBOARD V7.7 - ALTA PERFORMANCE
 * Gerador de Relatórios Instantâneos
 */

async function init() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;
        
        // Carregamento veloz de dados iniciais
        if (typeof M00 !== 'undefined') {
            const libData = await M00.execute('BIBLIOTECA_AVANCADA');
            renderCamadas(libData?.camadas);
            const books = await M00.execute('PRO', { userId: user.id });
            renderBooks(books);
        }
    } catch (e) { console.error("Erro no init:", e); }
}

function switchTab(view, isManual = true) {
    if (isManual) { document.getElementById("global-search").value = ""; }
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
    container.innerHTML = `<div style='text-align:center; padding:50px; color:#00cc66;'><i class='fas fa-bolt fa-spin'></i> M00 PROCESSANDO: ${query.toUpperCase()}...</div>`;

    try {
        // M00 executa a síntese teológica
        const d = await M00.execute('SENTINELA', { query });
        
        container.innerHTML = `
            <div style="background:#fdfcf0; color:#1a202c; border-radius:12px; padding:35px; max-width:850px; margin:auto; border:1px solid #e2e8f0; font-family:serif; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                <div style="border-bottom: 2px solid #1a202c; padding-bottom:15px; text-align:center; margin-bottom:25px;">
                    <h1 style="margin:0; font-size:1.8rem;">RELATÓRIO MASTER: ${d.tema}</h1>
                    <div style="background:#065f46; color:white; padding:3px 15px; border-radius:20px; font-size:0.7rem; display:inline-block; margin-top:10px;">SENTINELA V7</div>
                </div>

                <div style="background:#edf2f7; padding:20px; border-radius:8px; border-left:5px solid #00cc66; margin-bottom:25px;">
                    <h4 style="margin:0; color:#065f46; font-family:sans-serif; font-size:0.8rem;">M03 — ENTENDIMENTO</h4>
                    <p style="font-size:1.1rem; line-height:1.6; margin-top:10px;">${d.m03.originais}</p>
                    <p style="font-size:1rem; opacity:0.8;">${d.m03.contexto}</p>
                </div>

                <div style="background:#fffbeb; padding:20px; border-radius:8px; border-left:5px solid #C9A84C; margin-bottom:25px;">
                    <h4 style="margin:0; color:#92400e; font-family:sans-serif; font-size:0.8rem;">M02 — MENSAGEM</h4>
                    <p style="font-size:1.1rem; font-style:italic; margin-top:10px;">"${d.m02.hook}"</p>
                    <p style="font-size:1rem;">${d.m02.revelacao}</p>
                </div>

                <div style="background:#1a202c; color:white; padding:25px; border-radius:10px; text-align:center;">
                    <p style="margin-bottom:15px; font-size:0.9rem;">${d.cta.v1}</p>
                    <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:10px 40px;" onclick="window.location.href='https://dashboard.kiwify.com.br/products'">LIBERAR ESTUDO COMPLETO</button>
                </div>
            </div>
        `;
    } catch (err ) {
        container.innerHTML = "<div style='color:red'>Erro ao gerar relatório. Verifique sua conexão.</div>";
    }
}

function renderCamadas(camadas) {
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
    if (!free || !pro || !books) return;
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
