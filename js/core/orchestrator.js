console.log("M00 ORCHESTRATOR ONLINE");

async function iniciarSistema() {
  console.log("Inicializando Palavra em Série V9...");
  carregarLivros();
}

async function carregarLivros() {
  const { data, error } = await supabaseClient
    .from("livros")
    .select("*");

  if (error) {
    console.error("Erro ao carregar:", error);
    return;
  }

  const container = document.getElementById('books-container');
  if (container) {
    if (data && data.length > 0) {
      container.innerHTML = data.map(livro => `
        <div class="book-card">
          <div class="tag ${livro.category ? livro.category.toLowerCase() : 'free'}">
            ${livro.category ? livro.category.toUpperCase() : 'FREE'}
          </div>
          <h4>${livro.title}</h4>
          <p>${livro.content}</p>
        </div>
      `).join('');
    } else {
      container.innerHTML = "<p style='padding:20px; opacity:0.7;'>Conexão Estabelecida. Aguardando novos estudos no Supabase...</p>";
    }
  }
}

iniciarSistema();
