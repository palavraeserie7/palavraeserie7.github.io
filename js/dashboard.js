function NEXUS_NAVEGAR(aba) {
    const views = ['view-home', 'view-fluxo', 'view-estante', 'view-consulta'];
    views.forEach(v => document.getElementById(v).style.display = 'none');
    document.getElementById('view-' + aba).style.display = 'block';
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    if (document.getElementById('btn-' + aba)) document.getElementById('btn-' + aba).classList.add('active');
}

async function NEXUS_PESQUISAR(modo) {
    const tema = document.getElementById("global-search").value;
    if (!tema) { alert("Digite um tema primeiro!"); return; }
    NEXUS_NAVEGAR('consulta');
    document.getElementById("results-area").innerHTML = "Processando Inteligência Teológica...";
    const d = await M00.execute('EXECUTE_RESEARCH', { query: tema, mode: modo });
    if (d) {
        document.getElementById("results-area").innerHTML = `
            <div style="background:#fdfcf0; padding:40px; border:2px solid #1a202c; border-radius:15px; color:#1a202c; font-family:serif;">
                <h1 style="text-align:center;">${d.tema}</h1>
                <div style="background:white; padding:20px; border-left:10px solid #00cc66; margin:20px 0;">
                    <h3>EXEGESE PROFUNDA</h3><p>${d.m03.conteudo}</p>
                </div>
                <div style="background:#fffbeb; padding:20px; border-left:10px solid #C9A84C;">
                    <h3>MENSAGEM PRÁTICA</h3><p>${d.m02.conteudo}</p>
                </div>
                <button class="btn-liberado" onclick="NEXUS_NAVEGAR('fluxo')">VER MATRIZ TÉCNICA</button>
            </div>`;
        document.getElementById("fluxo-container").innerHTML = d.matrizFluxo.map(i => `
            <div style="background:#111827; padding:10px; margin-bottom:5px; border-left:4px solid #00cc66; font-size:0.8rem;">
                <strong>${i.etapa}:</strong> ${i.fonte} - ${i.funcao}
            </div>`).join('');
    }
}
