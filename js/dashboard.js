
window.onload = async () => {
    try {
        const user = await M00.execute('AUTH_GET_USER');
        if (user) document.getElementById("user-email").innerText = user.email;
        const data = await M00.execute('LOAD_DASHBOARD');
        if (data && data.books) renderizarEstante(data.books);
    } catch (e) {}
};

function mudarAba(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => document.getElementById(v).style.display = 'none');
    document.getElementById('view-' + aba).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (document.getElementById('btn-' + aba)) document.getElementById('btn-' + aba).classList.add('active');
}

async function executarPesquisa(modo) {
    const tema = document.getElementById("global-search").value;
    if (!tema) return;
    mudarAba('consulta');
    const d = await M00.execute('EXECUTE_RESEARCH', { query: tema, mode: modo });
    if (d) {
        renderizarDossie(d);
        atualizarFluxo(d.matrizFluxo, d.modo);
    }
}

function atualizarFluxo(matriz, modo) {
    const container = document.getElementById("fluxo-container");
    document.getElementById("fluxo-subtitle").innerText = `Nível: ${modo}`;
    container.innerHTML = matriz.map(item => `
        <div style="background:#111827; padding:12px; margin-bottom:8px; border-radius:8px; border-left:4px solid #00cc66;">
            <strong style="color:#00cc66;">${item.etapa}:</strong> <span style="color:#C9A84C;">${item.fonte}</span> - ${item.funcao}
        </div>`).join('');
}

function renderizarDossie(d) {
    document.getElementById("results-area").innerHTML = `
        <div style="background:#fdfcf0; color:#1a202c; border-radius:15px; padding:40px; border:2px solid #1a202c; font-family:serif;">
            <h1 style="text-align:center; text-transform:uppercase;">${d.tema}</h1>
            <div style="background:white; padding:25px; border-left:10px solid #00cc66; margin:20px 0;">
                <h3>${d.m03.titulo}</h3><p>${d.m03.conteudo}</p>
            </div>
            <div style="background:#fffbeb; padding:25px; border-left:10px solid #C9A84C;">
                <h3>${d.m02.titulo}</h3><p>${d.m02.conteudo}</p>
            </div>
            <div style="text-align:center;"><button class="btn-liberado" onclick="mudarAba('fluxo')">VER MATRIZ TÉCNICA</button></div>
        </div>`;
}

function renderizarEstante(books) {
    const grid = document.getElementById("books-grid");
    grid.innerHTML = books.map(b => `
        <div class="book-card">
            <img src="${b.capa || 'https://via.placeholder.com/150'}">
            <h4>${b.titulo || b.title}</h4>
        </div>` ).join('');
}

async function fazerLogout() { await M00.execute('AUTH_LOGOUT'); window.location.href = "./login.html"; }
