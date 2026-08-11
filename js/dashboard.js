async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = "./login.html"; return; }
    document.getElementById("user-email").innerText = user.email;
    try {
        const response = await M00.execute('load_dashboard', { userId: user.id });
        window.allBooks = response.books || [];
        renderBooks(window.allBooks);
    } catch (err) { console.error(err); }
}

function renderBooks(books) {
    const freeContainer = document.getElementById("books-free");
    const proContainer = document.getElementById("books-pro");
    const secFree = document.getElementById("section-free");
    const secPro = document.getElementById("section-pro");
    
    freeContainer.innerHTML = ""; proContainer.innerHTML = "";
    const free = books.filter(b => (b.level || b.nivel || 1) <= 1);
    const pro = books.filter(b => (b.level || b.nivel || 1) > 1);

    secFree.style.display = free.length > 0 ? "block" : "none";
    secPro.style.display = pro.length > 0 ? "block" : "none";

    free.forEach(b => freeContainer.appendChild(createBookCard(b)));
    pro.forEach(b => proContainer.appendChild(createBookCard(b)));
}

function createBookCard(book) {
    const div = document.createElement("div");
    div.className = "book-card";
    const title = book.title || book.titulo || "Sem Título";
    const cat = book.category || book.categoria || "Geral";
    const isPro = (book.level || book.nivel || 1) > 1;
    const cover = book.content_path || book.capa || `https://via.placeholder.com/200x300/111827/00cc66?text=${encodeURIComponent(title )}`;
    
    div.innerHTML = `
        <div class="tag ${isPro ? 'pro-tag' : 'free-tag'}">${isPro ? 'PRO' : 'FREE'}</div>
        <img src="${cover}">
        <div class="book-info">
            <h3>${title}</h3>
            <p>${cat}</p>
            <button class="${isPro ? 'btn-bloqueado' : 'btn-liberado'}" onclick="handleBookClick('${book.id}', ${isPro})">
                <i class="fas ${isPro ? 'fa-lock' : 'fa-play'}"></i> ${isPro ? 'Bloqueado' : 'Ler Agora'}
            </button>
        </div>`;
    return div;
}

function switchTab(cat) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById("page-title").innerText = cat === 'all' ? "Toda a Estante" : cat;
    const filtered = cat === 'all' ? window.allBooks : window.allBooks.filter(b => (b.category || b.categoria || "").toLowerCase() === cat.toLowerCase());
    renderBooks(filtered);
}

function searchTheme() {
    const term = document.getElementById("theme-search").value.toLowerCase();
    const filtered = window.allBooks.filter(b => (b.title || b.titulo || "").toLowerCase().includes(term));
    renderBooks(filtered);
}

function handleBookClick(id, isPro) {
    if (isPro) document.getElementById("pro-modal").style.display = "flex";
    else alert("Abrindo livro: " + id);
}

async function logout() { await supabase.auth.signOut(); window.location.href = "./login.html"; }
window.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
