/**
 * DASHBOARD VIEW CONTROLLER V9.5 (MATRIZ TÉCNICA)
 */

async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user) {
            document.getElementById("user-email").innerText = user.email;
        } else {
            document.getElementById("user-email").innerText = "Modo Visitante";
        }
        const data = await M00.execute('LOAD_DASHBOARD');
        if (data && data.books) renderBooks(data.books);
    } catch (e) { 
        console.log("Aviso: Rodando em modo limitado");
        document.getElementById("user-email").innerText = "Modo Visitante";
    }
}

function switchTab(view) {
    const views = ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
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
    updateStudyFlow(d.fluxo, d.modo);
    renderDossier(d);
}

function updateStudyFlow(fluxo, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if(!container) return;

    subtitle.innerText = `Matriz de Inteligência Ativada: Nível ${modo}`;
    
    let tableHtml = `
        <table class="technical-table" style="width:100%; border-collapse: collapse; margin-top:20px; background: #111827; border-radius: 10px; overflow: hidden;">
            <thead>
                <tr style="background: #1f2937; color: #00cc66; text-align: left;">
                    <th style="padding: 15px;">ETAPA</th>
                    <th style="padding: 15px;">FONTE</th>
                    <th style="padding: 15px;">FUNÇÃO</th>
                </tr>
            </thead>
            <tbody>
    `;

    fluxo.forEach(item => {
        tableHtml += `
            <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 15px; font-weight: bold;">${item.etapa}</td>
                <td style="padding: 15px; color: #C9A84C;">${item.fonte}</td>
                <td style="padding: 15px; font-size: 0.85rem; color: #94a3b8;">${item.funcao}</td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    container.innerHTML = tableHtml;
}

function renderDossier(d) {
    const container = document.getElementById("results-area");
    if(!container) return;
    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; border:2px solid #1a202c; font-family:serif; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
            <div style="border-bottom: 4px solid #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.8rem; letter-spacing:5px; color:#4a5568;">ARQUITETURA DE PESQUISA V9.5</h2>
                <h1 style="margin:15px 0; font-size:2.5rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:6px 20px; border-radius:50px; font-size:0.75rem; font-weight:bold; display:inline-block;">
                    NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100 [${d.status}]
                </div>
            </div>
            <div style="margin-bottom:30px; background:white; padding:30px; border-radius:10px; border-left:10px solid #00cc66;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.7;">${d.m03.conteudo}</p>
            </div>
            <div style="margin-bottom:30px; background:#fffbeb; padding:30px; border-radius:10px; border-left:10px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.7; color:#451a03;">${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center;">
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 50px;" onclick="switchTab('fluxo')">VER MATRIZ TÉCNICA NO FLUXO</button>
            </div>
        </div>`;
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return;
    f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px; aspect-ratio:2/3; object-fit:cover;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) p.appendChild(div); else f.appendChild(div);
    });
}

async function logout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
