document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    for (const [key, value] of Object.entries(matrizData)) {
        const section = document.createElement('section');
        section.className = 'etapa';
        section.innerHTML = `
            <h2>${key} — ${value.titulo}</h2>
            <ul>
                ${value.itens.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        app.appendChild(section);
    }
});
