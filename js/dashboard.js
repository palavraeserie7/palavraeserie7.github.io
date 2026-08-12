async function handleGlobalSearch() {
    const query = document.getElementById("global-search").value;
    if (query.length < 2) return;

    switchTab('consulta');
    const container = document.getElementById("results-area");
    container.innerHTML = "<div style='color:#00cc66'>Orquestrador M00 processando consulta...</div>";

    const results = await M00.execute('SENTINELA', { query });
    
    container.innerHTML = "";
    if (results.length === 0) {
        container.innerHTML = `<p style='opacity:0.5'>Nenhum registro teológico para "${query}". Adicione este tema no Supabase (tabela palavras) para ativá-lo.</p>`;
        return;
    }

    results.forEach(res => {
        const div = document.createElement("div");
        div.className = "theology-card";
        div.style = "background:#111827; padding:20px; border-radius:15px; margin-bottom:20px; border:1px solid #1f2937; position:relative;";
        
        const isHebrew = /[\u0590-\u05FF]/.test(res.text);
        
        div.innerHTML = `
            <div style="position:absolute; top:15px; right:15px; background:#065f46; color:#34d399; padding:4px 10px; border-radius:5px; font-size:0.7rem; font-weight:bold;">
                <i class="fas fa-shield-alt"></i> SENTINELA: ${res.sentinel}
            </div>
            <div style="color:#C9A84C; font-size:0.75rem; margin-bottom:5px; font-weight:bold;">${res.type === 'content' ? 'INSIGHT TEOLÓGICO' : res.camada}</div>
            <h3 style="margin:0 0 10px 0; color:#00cc66;">${res.title}</h3>
            <div style="font-size:1.1rem; line-height:1.6; ${isHebrew ? 'direction:rtl; color:#C9A84C; font-size:1.5rem;' : ''}">
                ${res.text}
            </div>
            ${res.nivel ? `<div style="margin-top:15px; font-size:0.7rem; opacity:0.5;">Nível Requerido: ${res.nivel}</div>` : ''}
        `;
        container.appendChild(div);
    });
}
