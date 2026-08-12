/**
 * DASHBOARD VIEW CONTROLLER V7
 * Gerencia a interface e a Busca Teológica Universal
 */

async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;

    // Carrega dados iniciais do Orquestrador M00
    window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
    renderCamadas(window.libraryData.camadas);
    
    const books = await M00.execute('PRO', { userId: user.id });
    renderBooks(books);
}

// A SUA FUNÇÃO DE BUSCA TEOLÓGICA UNIVERSAL
async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;

    switchTab('consulta');
    const container = document.getElementById("results-area");
    container.innerHTML = "<div style='color:#00cc66'>Orquestrador M00 processando consulta...</div>";

    const results = await M00.execute('SENTINELA', { query });
    
    container.innerHTML = "";
    if (results.length === 0) {
        container.innerHTML = `<p style='opacity:0.5'>Nenhum registro teológico para "${query}". Adicione este tema no Supabase (tabela palavras) para ativá-lo.</p>`;
        return;
    }

    results.forEach(res => {
        const div = document.createElement("div");
        div.className = "theology-card";
        div.style = "background:#111827; padding:20px; border-radius:15px; margin-bottom:20px; border:1px solid #1f2937; position:relative;";
        const isHebrew = /[\u0590-\u05FF]/.test(res.text);
        div.innerHTML = `
            <div style="position:absolute; top:15px; right:15px; background:#065f46; color:#34d399; padding:4px 10px; border-radius:5px; font-size:0.7rem; font-weight:bold;">
                <i class="fas fa-shield-alt"></i> SENTINELA: ${res.sentinel}
            </div>
            <div style="color:#C9A84C; font-size:0.75rem; margin-bottom:5px; font-weight:bold;">${res.type === 'content' ? 'INSIGHT TEOLÓGICO' : res.camada}</div>
            <h3 style="margin:0 0 10px 0; color:#00cc66;">${res.title}</h3>
            <div style="font-size:1.1rem; line-height:1.6; ${isHebrew ? 'direction:rtl; color:#C9A84C; font-size:1.5rem;' : ''}">
                ${res.text}
            </div>
            ${res.nivel ? `<div style="margin-top:15px; font-size:0.7rem; opacity:0.5;">Nível Requerido: ${res.nivel}</div>` : ''}
        `;
        container.appendChild(div);
    });
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
    if (!container) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.className = "layer-box";
        let html = `<div class="layer-header"><h2>${c.nome}</h2><p>${c.sub}</p></div><table class="library-table"><thead><tr><th>RECURSO</th><th>RESOLVE</th><th>NÍVEL</th></tr></thead><tbody>`;
        c.recursos.forEach(r => {
            html += `<tr><td><strong>${r.nome}</strong></td><td>${r.resolve}</td><td><span class="level-badge ${r.nivel.toLowerCase().replace('+', 'plus')}">${r.nivel}</span></td></tr>`;
        });
        html += `</tbody></table>`;
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function switchTab(view) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    // Ajuste para ativar a aba correta no menu
    const activeItem = document.querySelector(`[onclick="switchTab('${view}')"]`);
    if (activeItem) activeItem.classList.add('active');
    
    document.getElementById('home-view').style.display = view === 'home' || view === 'all' ? 'block' : 'none';
    document.getElementById('biblioteca-view').style.display = view === 'biblioteca' ? 'block' : 'none';
    document.getElementById('consulta-view').style.display = view === 'consulta' ? 'block' : 'none';
}

function renderBooks(books) {
    const free = document.getElementById("books-free");
    const pro = document.getElementById("books-pro");
    if (!free || !pro) return;
    free.innerHTML = ""; pro.innerHTML = "";
    books.forEach(b => {
        const div = document.createElement("div");
        div.className = "book-card";
        const isPro = (b.level || 1) > 1;
        div.innerHTML = `<div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div><img src="${b.content_path || 'https://via.placeholder.com/150'}"><div class="book-info"><h3>${b.title || b.titulo}</h3></div>`;
        if (isPro ) pro.appendChild(div); else free.appendChild(div);
    });
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
