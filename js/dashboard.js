function renderizarMatrizTecnica() {
    const areaPrincipal = document.querySelector('main') || document.querySelector('.conteudo-principal');
    if (!areaPrincipal) return;

    let html = '<div style="padding: 20px; color: #e0e0e0;"><h2 style="color: #bb86fc; margin-bottom: 20px;">Matriz de Análise Bíblica</h2>';
    
    for (const [key, value] of Object.entries(matrizData)) {
        html += `
            <div style="background: #1e1e1e; border: 1px solid #444; border-radius: 6px; padding: 15px; margin-bottom: 15px;">
                <h3 style="color: #bb86fc; margin-top: 0; border-bottom: 1px solid #333; padding-bottom: 8px;">${key} — ${value.titulo}</h3>
                <ul style="margin: 10px 0 0 20px; padding: 0; list-style-type: disc;">
                    ${value.itens.map(item => `<li style="padding: 3px 0; color: #ccc;">${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    html += '</div>';
    areaPrincipal.innerHTML = html;
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.textContent.includes('VER MATRIZ TÉCNICA')) {
        renderizarMatrizTecnica();
    }
});
