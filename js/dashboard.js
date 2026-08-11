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
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (data) {
            document.getElementById("stat-faith").innerText = (data.faith || 0) + "%";
            document.getElementById("stat-prayer").innerText = (data.prayer || 0) + "%";
            document.getElementById("stat-maturity").innerText = (data.maturity || 0) + "%";
            
            const levels = ["N1 - Despertar", "N2 - Palavra", "N3 - Voz", "N4 - Caminho", "N5 - Fundamentos"];
            const levelIdx = Math.min(Math.max(0, (data.level || 1) - 1), 4);
            document.getElementById("user-level").innerText = levels[levelIdx];
        }
    } catch (e) {
        console.log("Perfil ainda não criado.");
    }
}

async function loadBooks() {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");

    try {
        const { data: livros, error } = await supabase
            .from('livros')
            .select('*');

        if (error) throw error;

        freeContainer.innerHTML = "";
        proContainer.innerHTML = "";

        if (!livros || livros.length === 0) {
            freeContainer.innerHTML = "<p style='opacity:0.5'>Nenhum livro disponível no momento.</p>";
            return;
        }

        livros.forEach(livro => {
            const card = createBookCard(livro);
            if (livro.level <= 1) {
                freeContainer.appendChild(card);
            } else {
                proContainer.appendChild(card);
            }
        });

    } catch (err) {
        console.error("Erro ao carregar livros:", err);
        freeContainer.innerHTML = "<p style='color:red'>Erro ao carregar biblioteca.</p>";
    }
}

function createBookCard(livro) {
    const div = document.createElement("div");
    div.className = "book-card";
    
    const isPro = livro.level > 1;
    const tagClass = isPro ? "pro-tag" : "free-tag";
    const tagText = isPro ? "PRO" : "FREE";
    const btnClass = isPro ? "btn-bloqueado" : "btn-liberado";
    const btnIcon = isPro ? "fa-lock" : "fa-play";
    
    const coverUrl = livro.content_path || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(livro.title )}`;

    div.innerHTML = `
        <div class="tag ${tagClass}">${tagText}</div>
        <img src="${coverUrl}" alt="${livro.title}" style="width:100%; border-radius:10px; margin-bottom:15px; aspect-ratio:2/3; object-fit:cover;">
        <h3 style="margin: 0 0 10px 0; font-size: 1.1rem;">${livro.title}</h3>
        <p style="font-size: 0.8rem; opacity: 0.7; margin-bottom: 15px;">Categoria: ${livro.category || 'Geral'}</p>
        <button class="${btnClass}" onclick="openBook('${livro.id}', ${isPro})">
            <i class="fas ${btnIcon}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
        </button>
    `;
    return div;
}

function openBook(bookId, isPro) {
    if (isPro) {
        document.getElementById("pro-modal").style.display = "flex";
    } else {
        alert("Abrindo livro: " + bookId + "\n(Leitor E11 em desenvolvimento)");
    }
}

async function logout() {
    await supabase.auth.signOut();
    window.location.href = "./login.html";
}

initDashboard();
