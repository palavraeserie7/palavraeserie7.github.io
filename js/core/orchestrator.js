console.log("M00 ORCHESTRATOR ONLINE");

const systemState = {
  status: "ONLINE",
  engine: "E09",
  plano: "FREE"
};

let livrosGlobais = [];

async function iniciarSistema() {
  console.log("Inicializando Palavra em Série V9");
  await carregarLivros();
  configurarFiltros();
}

async function carregarLivros() {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "<p>Carregando biblioteca...</p>";

  // Removido o filtro de "ativo" para garantir que seus livros apareçam agora
  const { data, error } = await supabaseClient
      .from("livros")
      .select("*")
      .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro Supabase:", error);
    booksContainer.innerHTML = "<p>Erro ao carregar biblioteca.</p>";
    return;
  }

  livrosGlobais = data;
  renderizarLivros("ALL");
}

function renderizarLivros(tipo) {
  const booksContainer = document.getElementById("books-container");
  booksContainer.innerHTML = "";

  let livrosFiltrados = livrosGlobais;

  // Ajustado para usar a coluna 'categoria' do seu banco
  if (tipo !== "ALL") {
    livrosFiltrados = livrosGlobais.filter(
      livro => livro.categoria === tipo
    );
  }

  if (livrosFiltrados.length === 0) {
    booksContainer.innerHTML = "<p>Nenhum conteúdo encontrado para este filtro.</p>";
    return;
  }

  livrosFiltrados.forEach(livro => {
    const card = document.createElement("div");
    card.className = "book-card";
    
    // Ajustado para usar 'categoria' e 'conteudo' (link do PDF)
    card.innerHTML = `
      <div class="tag ${livro.categoria ? livro.categoria.toLowerCase() : 'free'}">
        ${livro.categoria || 'FREE'}
      </div>
      <h4>${livro.titulo}</h4>
      <p>${livro.descricao || "Sem descrição"}</p>
      <br>
      <a href="${livro.conteudo}" target="_blank" class="filter-btn free-btn" style="text-align:center; display:block; text-decoration:none;">
        Abrir Estudo
      </a>
    `;
    booksContainer.appendChild(card);
  });
}

function configurarFiltros() {
  const freeBtn = document.querySelector(".free-btn");
  const proBtn = document.querySelector(".pro-btn");

  if(freeBtn) {
    freeBtn.addEventListener("click", () => renderizarLivros("FREE"));
  }
  if(proBtn) {
    proBtn.addEventListener("click", () => renderizarLivros("PRO"));
  }
}

iniciarSistema();
