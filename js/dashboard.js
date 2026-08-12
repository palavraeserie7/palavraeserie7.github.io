
/**
 * DASHBOARD VIEW CONTROLLER V11 (DYNAMIC EXEGETICAL UI)
 */

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(init, 300);
});

async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user) document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD');
        if (data && data.books) renderBooks(data.books);
    } catch (e) {
        document.getElementById("user-email").innerText = "Modo Pesquisador";
    }
}

function mudarAba(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById('view-' + aba);
    if (target) target.style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const btn = document.getElementById('btn-' + aba);
    if (btn) btn.classList.add('active');
}

async function executarPesquisa(modo) {
    const query = document.getElementById("global-search").value.trim();
    if (!query || query.length < 2) {
        alert("Por favor, digite sua pergunta teológica primeiro.");
        return;
    }

    mudarAba('consulta');
    document.getElementById("results-area").innerHTML = `
        <div style="text-align:center; padding:100px;">
            <i class="fas fa-microchip fa-spin fa-3x" style="color:#00cc66; margin-bottom:20px;"></i>
            <h2 style="color:white;">M00 Roteando Fontes...</h2>
            <p style="color:#94a3b8;">Acionando Matriz de 12 Etapas para: "${query}"</p>
        </div>`;

    try {
        const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
        if (d) {
            renderDossier(d);
            atualizarFluxo(d.roteiro, d.modo);
        }
    } catch (e) {
        console.error(e);
    }
}

function atualizarFluxo(roteiro, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if(!container) return;

    subtitle.innerText = `Matriz Dinâmica Master V1 — Nível: ${modo}`;
    
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; margin-top: 20px;">
    `;

    roteiro.forEach(item => {
        html += `
            <div style="background:#111827; padding:15px; border-radius:10px; border:1px solid #1f2937; border-left:4px solid #00cc66;">
                <div style="font-size:0.65rem; color:#00cc66; font-weight:800; text-transform:uppercase; margin-bottom:5px;">ETAPA ${item.id} — ${item.nome}</div>
                <div style="color:#C9A84C; font-weight:bold; font-size:0.9rem; margin-bottom:5px;">${item.fontesAtivas.join(" / ")}</div>
                <div style="font-size:0.75rem; color:#94a3b8;">${item.funcao}</div>
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function renderDossier(d) {
    const area = document.getElementById("results-area");
    if(!area) return;

    area.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:50px; border:3px solid #1a202c; font-family:serif; max-width:900px; margin:auto; box-shadow:0 30px 60px rgba(0,0,0,0.5);">
            <div style="border-bottom:5px double #1a202c; text-align:center; padding-bottom:20px; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.7rem; letter-spacing:5px; color:#4a5568; font-weight:800;">ARQUITETURA DE INTELIGÊNCIA V11</h2>
                <h1 style="margin:15px 0; font-size:2.8rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:8px 25px; border-radius:50px; font-size:0.8rem; font-weight:bold; display:inline-block; border:2px solid #1a202c;">
                    NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100 [APROVADO]
                </div>
            </div>

            <div style="background:white; padding:30px; border-radius:10px; border-left:12px solid #00cc66; margin-bottom:30px; border:1px solid #e2e8f0;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <div style="font-size:1.1rem; line-height:1.8; color:#2d3748;">
                    ${d.m03.conteudo.split('\n\n').map(p => `<p style="margin-bottom:15px;">${p}</p>`).join('')}
                </div>
            </div>

            <div style="background:#fffbeb; padding:30px; border-radius:10px; border-left:12px solid #C9A84C; border:1px solid #fef3c7;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.8; color:#451a03; font-style:italic;">"${d.m02.conteudo}"</p>
            </div>

            <div style="text-align:center; margin-top:40px; border-top:1px dashed #cbd5e0; padding-top:30px;">
                <button class="btn-liberado" style="background:#00cc66; color:white; padding:15px 50px; font-size:1rem;" onclick="mudarAba('fluxo')">VER MATRIZ DINÂMICA DE FONTES</button>
            </div>
        </div>`;
}

function renderBooks(books) {
    const grid = document.getElementById("books-grid");
    if(!grid) return;
    grid.innerHTML = books.map(b => `
        <div class="book-card">
            <img src="${b.capa || 'https://via.placeholder.com/150'}">
            <h4>${b.titulo || b.title}</h4>
        </div>` ).join('');
}

async function fazerLogout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
