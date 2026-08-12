/**
 * DASHBOARD ULTRA-ROBUSTO V7.1
 * Sistema de segurança com limpeza automática de busca
 */

async function init() {
    console.log("Iniciando Dashboard...");
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { window.location.href = "./login.html"; return; }
        
        const emailEl = document.getElementById("user-email");
        if (emailEl) emailEl.innerText = user.email;

        if (typeof M00 !== 'undefined') {
            window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
            renderCamadas(window.libraryData?.camadas);
            renderFluxo(window.libraryData?.fluxo);
            
            const books = await M00.execute('PRO', { userId: user.id });
            renderBooks(books);
        }
    } catch (err) {
        console.error("Erro no carregamento:", err);
    }
}

// FUNÇÃO DE TROCA DE TELAS - AGORA LIMPA A BUSCA AUTOMATICAMENTE
function switchTab(view) {
    // 1. LIMPA A BARRA DE BUSCA PARA MOSTRAR TUDO DE NOVO
    const searchBox = document.getElementById("global-search");
    if (searchBox) searchBox.value = "";

    // 2. Atualiza visual do menu
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => {
        if (item.getAttribute('onclick')?.includes(`'${view}'`)) {
            item.classList.add('active');
        }
    });

    // 3. Mapeamento de IDs
    const sections = {
        'home': 'home-view',
        'biblioteca': 'biblioteca-view',
        'fluxo': 'fluxo-view',
        'estante': 'estante-view',
        'all': 'estante-view',
        'consulta': 'consulta-view'
    };

    // 4. Esconde TUDO
    const allSectionIds = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    allSectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 5. Mostra a tela certa
    const targetId = sections[view];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.style.display = 'block';
    } else {
        const home = document.getElementById('home-view');
        if (home) home.style.display = 'block';
    }
}

// BUSCA TEOLÓGICA UNIVERSAL
async function handleGlobalSearch() {
    const query = document.getElementById("global-search")?.value;
    if (!query || query.length < 2) return;

    // Não limpa a busca aqui, apenas muda de aba
    const allSectionIds = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view'];
    allSectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const consulta = document.getElementById('consulta-view');
    if (consulta) consulta.style.display = 'block';

    const container = document.getElementById("results-area");
    if (!container) return;
    container.innerHTML = "<div style='color:#00cc66'>Sentinela processando consulta...</div>";

    try {
        const results = await M00.execute('SENTINELA', { query });
        container.innerHTML = "";
        if (!results || results.length === 0) {
            container.innerHTML = `<p style='opacity:0.5'>Nenhum registro para "${query}".</p>`;
            return;
        }
        results.forEach(res => {
            const div = document.createElement("div");
            div.style = "background:#111827; padding:20px; border-radius:15px; margin-bottom:20px; border:1px solid #1f2937;";
            div.innerHTML = `<h3 style="margin:0; color:#00cc66;">${res.nome || res.title}</h3><p>${res.resolve || res.text}</p>`;
            container.appendChild(div);
        });
    } catch (e) { container.innerHTML = "Erro na busca."; }
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
    if (!container || !camadas) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.style = "margin-bottom:30px; border:1px solid #1f2937; border-radius:10px; overflow:hidden;";
        let html = `<div style="background:#1f2937; padding:15px;"><h3>${c.nome}</h3></div><table style="width:100%; border-collapse:collapse;">`;
        c.recursos.forEach(r => {
            html += `<tr style="border-bottom:1px solid #1f2937;"><td style="padding:10px;"><strong>${r.nome}</strong></td><td style="padding:10px;">${r.resolve}</td><td style="padding:10px; color:#00cc66;">${r.nivel}</td></tr>`;
        });
        html += `</table>`;
        div.innerHTML = html;
        container.appendChild(div);
    });
}

function renderFluxo(fluxo) {
    const container = document.getElementById("fluxo-container");
    if (!container || !fluxo) return;
    container.innerHTML = "";
    fluxo.forEach((passo, i) => {
        const div = document.createElement("div");
        div.style = "background:#111827; padding:15px; margin-bottom:10px; border-radius:8px; display:flex; gap:15px;";
        div.innerHTML = `<span style="background:#00cc66; width:25px; height:25px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">${i+1}</span><p style="margin:0;">${passo}</p>`;
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
        div.innerHTML = `<img src="${b.content_path || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><h4>${b.title || b.titulo}</h4>`;
        if ((b.level || 1 ) > 1) pro.appendChild(div); else free.appendChild(div);
    });
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
