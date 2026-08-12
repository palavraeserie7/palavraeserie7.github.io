/**
 * DASHBOARD VIEW CONTROLLER V9.6 (SÍNTESE RICA)
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
    document.getElementById("results-area").innerHTML = "<div style='text-align:center; padding:50px;'><i class='fas fa-spinner fa-spin fa-3x' style='color:#00cc66;'></i><p style='margin-top:20px;'>Orquestrador M00 processando Matriz de Inteligência...</p></div>";

    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
    if (!d) return;
    
    updateStudyFlow(d.fluxo, d.modo);
    renderDossier(d);
}

function updateStudyFlow(fluxo, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if(!container) return;
    subtitle.innerText = `Matriz Técnica V9.6: Nível ${modo}`;
    
    let tableHtml = `
        <table style="width:100%; border-collapse: collapse; margin-top:20px; background: #111827; border-radius: 10px; overflow: hidden; border: 1px solid #1f2937;">
            <thead>
                <tr style="background: #1f2937; color: #00cc66; text-align: left;">
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">ETAPA</th>
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">FONTE</th>
                    <th style="padding: 15px; border-bottom: 2px solid #00cc66;">FUNÇÃO</th>
                </tr>
            </thead>
            <tbody>
    `;
    fluxo.forEach(item => {
        tableHtml += `
            <tr style="border-bottom: 1px solid #1f2937;">
                <td style="padding: 15px; font-weight: bold; font-size: 0.85rem;">${item.etapa}</td>
                <td style="padding: 15px; color: #C9A84C; font-family: monospace;">${item.fonte}</td>
                <td style="padding: 15px; font-size: 0.8rem; color: #94a3b8;">${item.funcao}</td>
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
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:50px; border:3px solid #1a202c; font-family:serif; box-shadow: 0 40px 80px rgba(0,0,0,0.5); max-width: 900px; margin: auto;">
            <div style="border-bottom: 5px double #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.75rem; letter-spacing:6px; color:#4a5568; font-weight: 800;">ARQUITETURA TEOLÓGICA V9.6</h2>
                <h1 style="margin:20px 0; font-size:3rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:8px 25px; border-radius:50px; font-size:0.8rem; font-weight:bold; display:inline-block; border: 2px solid #1a202c;">
                    NÍVEL: ${d.modo} | SENTINELA: ${d.score}/100 [${d.status}]
                </div>
            </div>
            <div style="background:white; padding:35px; border-radius:10px; border-left:12px solid #00cc66; margin-bottom:30px;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03.titulo}</h3>
                <div style="font-size:1.1rem; line-height:1.8; color: #2d3748;">${d.m03.conteudo.replace(/\n/g, '  
')}</div>
            </div>
            <div style="background:#fffbeb; padding:35px; border-radius:10px; border-left:12px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02.titulo}</h3>
                <p style="font-size:1.1rem; line-height:1.8; color:#451a03;">${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center; margin-top:40px;">
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:18px 60px;" onclick="switchTab('fluxo')">VER MATRIZ TÉCNICA DE EVIDÊNCIAS</button>
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
