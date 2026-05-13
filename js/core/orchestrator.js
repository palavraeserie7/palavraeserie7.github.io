// Pega o plano global que o permissions.js identificou
const planoUsuario = window.userPlan || 'FREE';

card.innerHTML = `
    <div class="tag ${livro.categoria === 'PRO' ? 'pro-tag' : 'free-tag'}">
        ${livro.categoria || 'FREE'}
    </div>
    <h4>${livro.titulo}</h4>
    <p>${livro.descricao || "Sem descrição"}</p>
    <br>
    ${(livro.categoria === 'FREE' || planoUsuario === 'PRO') 
        ? `<a href="${livro.conteudo}" target="_blank" class="btn-liberado">Abrir Estudo</a>`
        : `<a href="#" onclick="alert('Estudo exclusivo para o Plano PRO!')" class="btn-bloqueado">Bloqueado 🔒</a>`
    }
`;
