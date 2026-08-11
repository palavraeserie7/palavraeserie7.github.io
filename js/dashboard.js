async function init() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;

    try {
        const response = await M00.execute('load_dashboard', { userId: user.id });
        renderProfile(response.profile);
        window.allBooks = response.books; // Salva todos os livros para filtrar depois
        renderBooks(response.books);
    } catch (err) { console.error("Erro M00:", err); }
}

function renderBooks(books) {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");
    freeContainer.innerHTML = ""; proContainer.innerHTML = "";

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        
        // Tenta ler vários nomes de colunas (Inglês ou Português)
        const title = book.title || book.titulo || "Sem Título";
        const category = book.category || book.categoria || "Geral";
        const cover = book.content_path || book.capa || book.imagem_url || "";
        const level = book.level || book.nivel || 1;
        
        const isPro = level > 1;
        const coverUrl = cover || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(title )}`;

        div.innerHTML = `
            <div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div>
            <img src="${coverUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>${category}</p>
            <button class="${isPro ? 'btn-bloqueado' : 'btn-liberado'}" onclick="handleBookClick('${book.id}', ${isPro})">
                <i class="fas ${isPro ? 'fa-lock' : 'fa-play'}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
            </button>`;
        
        if (level <= 1) freeContainer.appendChild(div);
        else proContainer.appendChild(div);
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
    
    const titles = {
        'home': 'Bem-vindo à sua Jornada',
        'estudos': 'Temas e Passagens Bíblicas',
        'biblioteca': 'Semente do Coração - Livros',
        'jornadas': 'Jornadas de Maturidade N1-N5'
    };
    document.getElementById("page-title").innerText = titles[tabName] || "Dashboard";

    // Lógica de Filtro: Se clicar em "Estudos", mostra só categoria "Estudo"
    if (tabName === 'estudos') {
        const filtered = window.allBooks.filter(b => (b.category || b.categoria) === 'Estudo');
        renderBooks(filtered);
    } else {
        renderBooks(window.allBooks);
    }
}

function handleBookClick(id, isPro) {
    if (isPro) document.getElementById("pro-modal").style.display = "flex";
    else alert("Abrindo Estudo/Livro: " + id + "\n(O próximo passo é criar a tela de leitura E11)");
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
