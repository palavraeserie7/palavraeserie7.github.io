async function init() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!user || error) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;

    try {
        const response = await M00.execute('load_dashboard', { userId: user.id });
        renderProfile(response.profile);
        window.allBooks = response.books; // Fonte de verdade para a busca
        renderBooks(response.books);
    } catch (err) { console.error("Erro M00:", err); }
}

function renderBooks(books) {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");
    freeContainer.innerHTML = ""; proContainer.innerHTML = "";

    if (!books || books.length === 0) {
        freeContainer.innerHTML = "<p style='opacity:0.5'>Nenhum conteúdo encontrado para esta consulta.</p>";
        return;
    }

    books.forEach(book => {
        const div = document.createElement("div");
        div.className = "book-card";
        
        const title = book.title || book.titulo || "Sem Título";
        const category = book.category || book.categoria || "Geral";
        const cover = book.content_path || book.capa || "";
        const level = book.level || book.nivel || 1;
        const sentinelScore = book.sentinel_score || 0; // Novo: Score do Sentinela Editorial
        
        const isPro = level > 1;
        const coverUrl = cover || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(title )}`;

        // Lógica de Cor do Sentinela (0-30 Verde, 31-70 Amarelo, 71+ Vermelho)
        let sentinelColor = "#00cc66";
        if (sentinelScore > 30) sentinelColor = "#f1c40f";
        if (sentinelScore > 70) sentinelColor = "#e74c3c";

        div.innerHTML = `
            <div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div>
            <div class="sentinel-badge" title="Sentinela Editorial" style="background:${sentinelColor}">
                <i class="fas fa-shield-halved"></i> ${sentinelScore}
            </div>
            <img src="${coverUrl}" alt="${title}">
            <h3 class="${isHebrew(title) ? 'hebrew-text' : ''}">${title}</h3>
            <p>${category}</p>
            <button class="${isPro ? 'btn-bloqueado' : 'btn-liberado'}" onclick="handleBookClick('${book.id}', ${isPro})">
                <i class="fas ${isPro ? 'fa-lock' : 'fa-play'}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
            </button>`;
        
        if (level <= 1) freeContainer.appendChild(div);
        else proContainer.appendChild(div);
    });
}

// Função de Busca em Tempo Real
function searchTheme() {
    const term = document.getElementById("theme-search").value.toLowerCase();
    const filtered = window.allBooks.filter(b => 
        (b.title || b.titulo || "").toLowerCase().includes(term) ||
        (b.category || b.categoria || "").toLowerCase().includes(term)
    );
    renderBooks(filtered);
}

// Detecta se o texto é Hebraico para ajustar a direção (RTL)
function isHebrew(text) {
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
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

    if (tabName === 'estudos') {
        const filtered = window.allBooks.filter(b => (b.category || b.categoria) === 'Estudo');
        renderBooks(filtered);
    } else {
        renderBooks(window.allBooks);
    }
}

function handleBookClick(id, isPro) {
    if (isPro) document.getElementById("pro-modal").style.display = "flex";
    else alert("Iniciando motor E11 para consulta profunda: " + id);
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
