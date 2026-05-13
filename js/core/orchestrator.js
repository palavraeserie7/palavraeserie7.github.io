
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

  const booksContainer =
    document.getElementById("books-container");

  booksContainer.innerHTML =
    "<p>Carregando biblioteca...</p>";

  const { data, error } =
    await supabaseClient
      .from("livros")
      .select("*")
      .eq("ativo", true)
      .order("created_at", { ascending: false });

  if (error) {

    console.error("Erro Supabase:", error);

    booksContainer.innerHTML =
      "<p>Erro ao carregar biblioteca.</p>";

    return;
  }

  livrosGlobais = data;

  renderizarLivros("ALL");

}

function renderizarLivros(tipo) {

  const booksContainer =
    document.getElementById("books-container");

  booksContainer.innerHTML = "";

  let livrosFiltrados = livrosGlobais;

  if (tipo !== "ALL") {

    livrosFiltrados =
      livrosGlobais.filter(
        livro => livro.tipo === tipo
      );
  }

  if (livrosFiltrados.length === 0) {

    booksContainer.innerHTML =
      "<p>Nenhum conteúdo encontrado.</p>";

    return;
  }

  livrosFiltrados.forEach(livro => {

    const card = document.createElement("div");

    card.className = "book-card";

    card.innerHTML = `

      <div class="tag ${livro.tipo.toLowerCase()}">
        ${livro.tipo}
      </div>

      <h4>${livro.titulo}</h4>

      <p>
        ${livro.descricao || "Sem descrição"}
      </p>

      <br>

      <a
        href="${livro.pdf_url}"
        target="_blank"
        class="filter-btn free-btn"
      >
        Abrir Estudo
      </a>

    `;

    booksContainer.appendChild(card);

  });

}

function configurarFiltros() {

  const freeBtn =
    document.querySelector(".free-btn");

  const proBtn =
    document.querySelector(".pro-btn");

  freeBtn.addEventListener("click", () => {

    renderizarLivros("FREE");

  });

  proBtn.addEventListener("click", () => {

    renderizarLivros("PRO");

  });

}

iniciarSistema();
