async function initDashboard() {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (!user || authError) {
        window.location.href = "./login.html";
        return;
    }

    document.getElementById("user-email").innerText = user.email;
    await loadSpiritualProfile(user.id);
    await loadBooks();
}

async function loadSpiritualProfile(userId) {
    try {
        const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (data) {
            document.getElementById("stat-faith").innerText = (data.faith || 0) + "%";
            document.getElementById("stat-prayer").innerText = (data.prayer || 0) + "%";
            document.getElementById("stat-maturity").innerText = (data.maturity || 0) + "%";
            const levels = ["N1 - Despertar", "N2 - Palavra", "N3 - Voz", "N4 - Caminho", "N5 - Fundamentos"];
            document.getElementById("user-level").innerText = levels[Math.min((data.level || 1) - 1, 4)];
        }
    } catch (e) { console.log("Perfil pendente."); }
}

async function loadBooks() {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");

    try {
        const { data: livros } = await supabase.from('livros').select('*');
        freeContainer.innerHTML = "";
        proContainer.innerHTML = "";

        if (!livros || livros.length === 0) {
            freeContainer.innerHTML = "<p style='opacity:0.5'>Biblioteca em atualização...</p>";
            return;
        }

        livros.forEach(livro => {
            const card = createBookCard(livro);
            if (livro.level <= 1) freeContainer.appendChild(card);
            else proContainer.appendChild(card);
        });
    } catch (err) { freeContainer.innerHTML = "Erro ao carregar."; }
}

function createBookCard(livro) {
    const div = document.createElement("div");
    div.className = "book-card";
    const isPro = livro.level > 1;
    const coverUrl = livro.content_path || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(livro.title )}`;
    div.innerHTML = `
        <div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div>
        <img src="${coverUrl}" style="width:100%; border-radius:10px; margin-bottom:15px; aspect-ratio:2/3; object-fit:cover;">
        <h3 style="margin:0; font-size:1.1rem;">${livro.title}</h3>
        <p style="font-size:0.8rem; opacity:0.6;">${livro.category || 'Geral'}</p>
        <button class="${isPro ? 'btn-bloqueado' : 'btn-liberado'}" onclick="openBook('${livro.id}', ${isPro})">
            <i class="fas ${isPro ? 'fa-lock' : 'fa-play'}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
        </button>`;
    return div;
}

function openBook(id, isPro) {
    if (isPro) document.getElementById("pro-modal").style.display = "flex";
    else alert("Iniciando leitura do livro: " + id);
}

async function logout() {
    await supabase.auth.signOut();
    window.location.href = "./login.html";
}

initDashboard();
