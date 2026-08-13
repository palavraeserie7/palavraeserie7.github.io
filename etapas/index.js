// Exemplo de como o index.js renderiza os botões internos de cada etapa:
etapa.itens.forEach(item => {
    html += `
        <button class="btn-criterio" data-etapa="${etapa.id}" data-item="${item}">
            🔍 <strong>${item}</strong>
        </button>
    `;
});
