async function initDashboard() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!user || authError) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;
    await loadSpiritualProfile(user.id);
    await loadBooks();
}

async function loadBooks() {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");
    try {
        const { data: livros } = await supabase.from('livros').select('*');
        freeContainer.innerHTML = ""; proContainer.innerHTML = "";
        if (!livros || livros.length === 0) {
            freeContainer.innerHTML = "<p style='opacity:0.5'>Biblioteca em atualização...</p>";
            return;
        }
        livros.forEach(livro => {
            const card = createBookCard(livro);
            const level = livro.level || livro.nivel || 1;
            if (level <= 1) freeContainer.appendChild(card);
            else proContainer.appendChild(card);
        });
    } catch (err) { freeContainer.innerHTML = "Erro ao carregar."; }
}

function createBookCard(livro) {
    const div = document.createElement("div");
    div.className = "book-card";
    // Tenta ler vários nomes de colunas possíveis
    const titulo = livro.title || livro.titulo || "Sem título";
    const categoria = livro.category || livro.categoria || "Geral";
    const capa = livro.content_path || livro.capa || livro.imagem_url || "";
    const nivel = livro.level || livro.nivel || 1;
    
    const isPro = nivel > 1;
    const coverUrl = capa || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(titulo )}`;

    div.innerHTML = `
        <div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div>
        <img src="${coverUrl}" style="width:100%; border-radius:10px; margin-bottom:15px; aspect-ratio:2/3; object-fit:cover;">
        <h3 style="margin:0; font-size:1.1rem;">${titulo}</h3>
        <p style="font-size:0.8rem; opacity:0.6;">${categoria}</p>
        <button class="${isPro ? 'btn-bloqueado' : 'btn-liberado'}" onclick="openBook('${livro.id}', ${isPro})">
            <i class="fas ${isPro ? 'fa-lock' : 'fa-play'}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
        </button>`;
    return div;
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
initDashboard();
