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
    container.innerHTML = `<div style='text-align:center; padding:50px; color:#00cc66;'><i class='fas fa-brain fa-spin'></i> M00 SINTETIZANDO RELATÓRIO PARA: ${query.toUpperCase()}...</div>`;

    const dossier = await M00.execute('SENTINELA', { query });
    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); max-width:900px; margin:auto; font-family:'Georgia', serif; border: 1px solid #e2e8f0;">
            <div style="border-bottom: 4px solid #1a202c; padding-bottom:15px; text-align:center; margin-bottom:30px;">
                <h1 style="margin:0; font-size:2.5rem; text-transform:uppercase;">DOSSIÊ: ${dossier.tema}</h1>
                <div style="background:#065f46; color:white; padding:5px 15px; border-radius:20px; font-size:0.7rem; font-weight:bold; display:inline-block;">SENTINELA: ${dossier.sentinel_score}%</div>
            </div>
            <div style="background:#edf2f7; padding:25px; border-radius:10px; border-left:8px solid #00cc66; margin-bottom:30px;">
                <h3 style="margin:0; color:#065f46; font-size:0.9rem;">PARECER DO ORQUESTRADOR M00</h3>
                <p style="font-size:1.2rem; line-height:1.8;">${dossier.parecer_sentinela}</p>
            </div>
            <div style="margin-bottom:30px; text-align:center; background:white; padding:20px; border-radius:10px; border:1px solid #e2e8f0;">
                <h4 style="margin:0; color:#b45309;">ESTUDO DE ORIGINAIS</h4>
                <p style="font-size:1.5rem; color:#b45309; margin:10px 0;">${dossier.originais_sugeridos}</p>
            </div>
            <div style="display:grid; grid-template-columns:1fr; gap:20px;">
                ${dossier.roteiro_estudo.map(c => `
                    <div style="padding-left:20px; border-left:3px solid #00cc66;">
                        <h4 style="margin:0; color:#00cc66; font-size:0.8rem;">${c.camada}</h4>
                        <div style="display:flex; gap:10px; margin-top:5px;">
                            ${c.ferramentas.map(f => `<span style="background:#f1f5f9; padding:2px 8px; border-radius:4px; font-size:0.8rem; border:1px solid #cbd5e0;">${f.nome}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div style="margin-top:40px; text-align:center; border-top:1px solid #e2e8f0; padding-top:20px;">
                <button class="btn-liberado" style="background:#1a202c; color:white; width:auto; padding:12px 40px; border-radius:30px;" onclick="window.print()">IMPRIMIR RELATÓRIO</button>
            </div>
        </div>
    `;
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
    if (!container || !camadas) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.style = "margin-bottom:20px; border:1px solid #1f2937; border-radius:8px; overflow:hidden;";
        let html = `<div style="background:#1f2937; padding:10px;"><h3>${c.nome}</h3></div><table style="width:100%; border-collapse:collapse;">`;
        c.recursos.forEach(r => { html += `<tr style="border-bottom:1px solid #1f2937;"><td style="padding:8px;"><strong>${r.nome}</strong></td><td style="padding:8px;">${r.resolve}</td><td style="padding:8px; color:#00cc66;">${r.nivel}</td></tr>`; });
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
        div.innerHTML = `<img src="${b.content_path || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) pro.appendChild(div); else free.appendChild(div);
    });
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
