* DASHBOARD VIEW CONTROLLER V9.1 (DEFENSIVE MODE)
 * Garante que todos os dados sejam exibidos como strings e o fluxo seja dinâmico.
 */

async function init() {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (!user) { window.location.href = "./login.html"; return; }
        document.getElementById("user-email").innerText = user.email;

        const data = await M00.execute('LOAD_DASHBOARD', { userId: user.id });
        if (data && data.books) renderBooks(data.books);
    } catch (e) { console.error("Init Error:", e); }
}

async function executeSearchWithMode(mode) {
    const queryEl = document.getElementById("global-search");
    const query = queryEl ? queryEl.value : "";
    
    if (!query || query.length < 2) {
        alert("Por favor, digite sua pergunta ou tema na barra de busca.");
        return;
    }

    // 1. Executa a pesquisa
    const d = await M00.execute('EXECUTE_RESEARCH', { query, mode });
    if (!d) return;

    // 2. Normaliza os dados para exibição (Garante strings)
    const modoStr = typeof d.modo === 'string' ? d.modo : (d.modo?.nome || String(d.modo || mode).toUpperCase());
    const etapas = Array.isArray(d.etapas) ? d.etapas : [];

    // 3. Atualiza o Fluxo
    updateStudyFlow(etapas, modoStr);

    // 4. Renderiza o Dossiê
    switchTab('consulta', false);
    renderDossier({ ...d, modo: modoStr, etapas });
}

function updateStudyFlow(etapas, modo) {
    const container = document.getElementById("fluxo-container");
    const subtitle = document.getElementById("fluxo-subtitle");
    if (!container) return;

    subtitle.innerText = `Etapas do nível: ${modo}`;
    container.innerHTML = etapas.map((e, i) => `
        <div style="background:#111827; padding:15px; margin-bottom:10px; border-radius:8px; display:flex; gap:15px; border-left:4px solid #00cc66;">
            <span style="font-weight:bold; color:#00cc66;">${(i+1).toString().padStart(2, '0')}</span> 
            <span>${typeof e === 'string' ? e : (e.nome || 'Etapa de Análise')}</span>
        </div>
    `).join('');
}

function renderDossier(d) {
    const container = document.getElementById("results-area");
    if (!container) return;

    container.innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:45px; border:2px solid #1a202c; font-family:serif; box-shadow: 0 30px 60px rgba(0,0,0,0.4);">
            <div style="border-bottom: 4px solid #1a202c; padding-bottom:20px; text-align:center; margin-bottom:40px;">
                <h2 style="margin:0; font-size:0.8rem; letter-spacing:5px; color:#4a5568;">ARQUITETURA DE PESQUISA V9.1</h2>
                <h1 style="margin:15px 0; font-size:2.5rem; text-transform:uppercase;">${d.tema}</h1>
                <div style="background:#065f46; color:white; padding:6px 20px; border-radius:50px; font-size:0.75rem; font-weight:bold; display:inline-block;">
                    NÍVEL: ${d.modo} | SENTINELA: ${d.score || 0}/100 [${d.status || 'PROCESSANDO'}]
                </div>
            </div>

            <div style="margin-bottom:30px; background:white; padding:30px; border-radius:10px; border-left:10px solid #00cc66;">
                <h3 style="color:#00cc66; margin-top:0;">${d.m03?.titulo || 'M03'}</h3>
                <p style="font-size:1.1rem; line-height:1.7;">${d.m03?.conteudo || 'Processando análise...'}</p>
            </div>

            <div style="margin-bottom:30px; background:#fffbeb; padding:30px; border-radius:10px; border-left:10px solid #C9A84C;">
                <h3 style="color:#92400e; margin-top:0;">${d.m02?.titulo || 'M02'}</h3>
                <p style="font-size:1.1rem; line-height:1.7; color:#451a03;">${d.m02?.conteudo || 'Processando mensagem...'}</p>
            </div>

            <div style="text-align:center; background:#0f172a; padding:30px; border-radius:15px; color:white;">
                <button class="btn-liberado" style="background:#00cc66; color:white; width:auto; padding:15px 50px;" onclick="switchTab('fluxo')">VER ETAPAS NO FLUXO</button>
            </div>
        </div>`;
}

function switchTab(view, isManual = true) {
    const sections = ['home-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => { const el = document.getElementById(id); if(el) el.style.display = 'none'; });
    
    const target = { 'home':'home-view', 'fluxo':'fluxo-view', 'estante':'estante-view', 'consulta':'consulta-view' }[view] || 'home-view';
    const targetEl = document.getElementById(target);
    if (targetEl) targetEl.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
}

function renderBooks(books) {
    const f = document.getElementById("books-free"), p = document.getElementById("books-pro");
    if (!f || !p) return; f.innerHTML = ""; p.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div"); div.className = "book-card";
        div.innerHTML = `<img src="${b.content_path || b.capa || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px; aspect-ratio:2/3; object-fit:cover;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1) > 1) p.appendChild(div); else f.appendChild(div);
    });
}

async function logout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
