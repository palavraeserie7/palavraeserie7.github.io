async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;

    // Carrega dados do Orquestrador M00
    window.libraryData = await M00.execute('BIBLIOTECA_AVANCADA');
    renderCamadas(window.libraryData.camadas);
    renderFluxo(window.libraryData.fluxo);
    
    const books = await M00.execute('PRO', { userId: user.id });
    renderBooks(books);
}

function renderCamadas(camadas) {
    const container = document.getElementById("camadas-container");
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

function renderFluxo(fluxo) {
    const container = document.getElementById("fluxo-container");
    container.innerHTML = "";
    if (!fluxo) return;
    fluxo.forEach((passo, i) => {
        const div = document.createElement("div");
        div.className = "fluxo-step";
        div.innerHTML = `<span class="step-num">${i+1}</span><p>${passo}</p>`;
        container.appendChild(div);
    });
}

function switchTab(view) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    document.getElementById('home-view').style.display = view === 'home' || view === 'all' ? 'block' : 'none';
    document.getElementById('biblioteca-view').style.display = view === 'biblioteca' ? 'block' : 'none';
    document.getElementById('fluxo-view').style.display = view === 'fluxo' ? 'block' : 'none';
}

function renderBooks(books) {
    const free = document.getElementById("books-free");
    const pro = document.getElementById("books-pro");
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
