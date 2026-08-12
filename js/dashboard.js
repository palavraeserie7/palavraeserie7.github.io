/**
 * DASHBOARD DEFINITIVO V7
 * Gerencia todas as abas, a busca e a Biblioteca de 9 Camadas
 */

async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;

    try {
        // Carrega dados do Orquestrador M00
        window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
        if (window.libraryData) {
            renderCamadas(window.libraryData.camadas);
            renderFluxo(window.libraryData.fluxo);
        }
        
        // Carrega a estante de livros
        const books = await M00.execute('PRO', { userId: user.id });
        renderBooks(books);
    } catch (err) {
        console.error("Erro na inicialização:", err);
    }
}

// FUNÇÃO DE TROCA DE TELAS (CORRIGIDA)
function switchTab(view) {
    console.log("Trocando para a visão:", view);
    
    // 1. Desativar todos os itens do menu
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    // 2. Ativar o item clicado
    const activeItem = document.querySelector(`[onclick*="switchTab('${view}')"]`);
    if (activeItem) activeItem.classList.add('active');

    // 3. Esconder todas as seções primeiro
    const sections = ['home-view', 'biblioteca-view', 'fluxo-view', 'estante-view', 'consulta-view'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // 4. Mostrar apenas a seção correta
    if (view === 'home') document.getElementById('home-view').style.display = 'block';
    else if (view === 'biblioteca') document.getElementById('biblioteca-view').style.display = 'block';
    else if (view === 'fluxo') document.getElementById('fluxo-view').style.display = 'block';
    else if (view === 'estante' || view === 'all') document.getElementById('estante-view').style.display = 'block';
    else if (view === 'consulta') document.getElementById('consulta-view').style.display = 'block';
}

// BUSCA TEOLÓGICA UNIVERSAL
async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;

    switchTab('consulta');
    const container = document.getElementById("results-area");
    container.innerHTML = "<div style='color:#00cc66'>Sentinela processando consulta...</div>";

    const results = await M00.execute('SENTINELA', { query });
    
    container.innerHTML = "";
    if (!results || results.length === 0) {
        container.innerHTML = `<p style='opacity:0.5'>Nenhum registro para "${query}".</p>`;
        return;
    }

    results.forEach(res => {
        const div = document.createElement("div");
        div.className = "theology-card";
        div.style = "background:#111827; padding:20px; border-radius:15px; margin-bottom:20px; border:1px solid #1f2937; position:relative;";
        div.innerHTML = `
            <div style="position:absolute; top:15px; right:15px; background:#065f46; color:#34d399; padding:4px 10px; border-radius:5px; font-size:0.7rem; font-weight:bold;">
                VALIDADO
            </div>
            <h3 style="margin:0 0 10px 0; color:#00cc66;">${res.nome || res.title}</h3>
            <p style="font-size:1rem; line-height:1.6;">${res.resolve || res.text}</p>
            <div style="margin-top:15px; font-size:0.7rem; opacity:0.5;">Camada: ${res.camada || 'Geral'} | Nível: ${res.nivel || 'Básico'}</div>
        `;
        container.appendChild(div);
    });
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
    if (!container || !camadas) return;
    container.innerHTML = "";
    camadas.forEach(c => {
        const div = document.createElement("div");
        div.className = "layer-box";
        div.style = "margin-bottom: 30px; border: 1px solid #1f2937; border-radius: 10px; overflow: hidden;";
        let html = `<div style="background:#1f2937; padding:15px;"><h3>${c.nome}</h3></div><table style="width:100%; border-collapse:collapse;">`;
        c.recursos.forEach(r => {
            html += `<tr style="border-bottom:1px solid #1f2937;"><td style="padding:10px;"><strong>${r.nome}</strong></td><td style="padding:10px;">${r.resolve}</td><td style="padding:10px;"><span class="level-badge">${r.nivel}</span></td></tr>`;
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
        div.className = "fluxo-step";
        div.style = "display:flex; align-items:center; gap:15px; background:#111827; padding:15px; border-radius:10px; margin-bottom:10px;";
        div.innerHTML = `<span style="background:#00cc66; color:white; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:bold;">${i+1}</span><p style="margin:0;">${passo}</p>`;
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
        const isPro = (b.level || 1) > 1;
        div.innerHTML = `<div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div><img src="${b.content_path || 'https://via.placeholder.com/150'}" style="width:100%; border-radius:8px;"><div class="book-info"><h3>${b.title || b.titulo}</h3></div>`;
        if (isPro ) pro.appendChild(div); else free.appendChild(div);
    });
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
