/**
 * DASHBOARD ULTRA-ROBUSTO V7
 * Sistema de segurança contra travamentos de menu
 */

async function init() {
    console.log("Iniciando Dashboard...");
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { window.location.href = "./login.html"; return; }
        
        const emailEl = document.getElementById("user-email");
        if (emailEl) emailEl.innerText = user.email;

        // Carrega dados do Orquestrador M00 com segurança
        if (typeof M00 !== 'undefined') {
            window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
            renderCamadas(window.libraryData?.camadas);
            renderFluxo(window.libraryData?.fluxo);
            
            const books = await M00.execute('PRO', { userId: user.id });
            renderBooks(books);
        }
    } catch (err) {
        console.error("Erro no carregamento inicial:", err);
    }
}

// FUNÇÃO DE TROCA DE TELAS - VERSÃO À PROVA DE ERROS
function switchTab(view) {
    console.log("Navegando para:", view);
    
    // 1. Atualiza visual do menu
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    // Tenta achar o item do menu de várias formas para não travar
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => {
        if (item.getAttribute('onclick')?.includes(`'${view}'`)) {
            item.classList.add('active');
        }
    });

    // 2. Mapeamento de IDs de seções (Garanta que estes IDs existam no seu HTML)
    const sections = {
        'home': 'home-view',
        'biblioteca': 'biblioteca-view',
        'fluxo': 'fluxo-view',
        'estante': 'estante-view',
        'all': 'estante-view',
        'consulta': 'consulta-view'
    };

    // 3. Esconde TUDO primeiro
    const allSectionIds = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    allSectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 4. Mostra apenas a seção desejada
    const targetId = sections[view];
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        targetEl.style.display = 'block';
    } else {
        // Se não achar a seção, volta para a home para não ficar branco
        const home = document.getElementById('home-view');
        if (home) home.style.display = 'block';
        console.warn("Seção não encontrada no HTML:", targetId);
    }
}

// BUSCA TEOLÓGICA UNIVERSAL
async function handleGlobalSearch() {
    const query = document.getElementById("global-search")?.value;
    if (!query || query.length < 2) return;

    switchTab('consulta');
    const container = document.getElementById("results-area");
    if (!container) return;
    
    container.innerHTML = "<div style='color:#00cc66'>Processando consulta...</div>";

    try {
        const results = await M00.execute('SENTINELA', { query });
        container.innerHTML = "";
        
        if (!results || results.length === 0) {
            container.innerHTML = `<p style='opacity:0.5'>Nenhum registro para "${query}".</p>`;
            return;
        }

        results.forEach(res => {
            const div = document.createElement("div");
            div.className = "theology-card";
            div.style = "background:#111827; padding:20px; border-radius:15px; margin-bottom:20px; border:1px solid #1f2937;";
            div.innerHTML = `
                <h3 style="margin:0 0 10px 0; color:#00cc66;">${res.nome || res.title}</h3>
                <p style="font-size:1rem; line-height:1.6;">${res.resolve || res.text}</p>
                <div style="margin-top:15px; font-size:0.7rem; opacity:0.5;">Nível: ${res.nivel || 'Geral'}</div>
            `;
            container.appendChild(div);
        });
    } catch (e) {
        container.innerHTML = "Erro na busca.";
    }
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
    if (!container || !camadas) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.innerHTML = `<div style="background:#1f2937; padding:10px; margin-top:20px;"><h3>${c.nome}</h3></div>`;
        const table = document.createElement("table");
        table.style.width = "100%";
        c.recursos.forEach(r => {
            const row = table.insertRow();
            row.innerHTML = `<td style="padding:10px; border-bottom:1px solid #1f2937;"><strong>${r.nome}</strong></td><td style="padding:10px; border-bottom:1px solid #1f2937;">${r.resolve}</td>`;
        });
        div.appendChild(table);
        container.appendChild(div);
    });
}

function renderFluxo(fluxo) {
    const container = document.getElementById("fluxo-container");
    if (!container || !fluxo) return;
    container.innerHTML = "";
    fluxo.forEach((passo, i) => {
        const div = document.createElement("div");
        div.style = "background:#111827; padding:15px; margin-bottom:10px; border-radius:8px;";
        div.innerHTML = `<strong>${i+1}.</strong> ${passo}`;
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
