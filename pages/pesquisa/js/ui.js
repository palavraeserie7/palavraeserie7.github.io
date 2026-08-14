/**
 * UI.JS - Controla a tela de pesquisa e exibição dos resultados
 */
async function iniciarPesquisa() {
    const input = document.getElementById("input-pesquisa");
    if (!input || !input.value.trim()) { alert("Digite um tema."); return; }
    
    const tema = input.value.trim();
    const resultadoArea = document.getElementById("resultado-area");
    resultadoArea.innerHTML = "<h3>Executando Matriz de 12 Etapas para: " + tema + "...</h3>";

    try {
        const promptGeral = "Faça uma análise exegética profunda de '" + tema + "' percorrendo as 12 etapas acadêmicas (Texto, Crítica, Gramática, Léxico, Teologia, Contexto, História, Cânon, Hermenêutica, Sistemática, Comparação e Síntese) usando fontes como NA28, BDAG, Metzger e Grudem.";
        const resultado = await executarMotorIA(promptGeral);

        resultadoArea.innerHTML = `
            <div style="background:#fdfcf0; padding:30px; border:2px solid #1a202c; border-radius:10px; color:#1a202c; font-family:serif;">
                <h1 style="text-align:center;">${tema.toUpperCase()}</h1>
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.1rem;">${resultado}</div>
            </div>`;
    } catch (e) {
        resultadoArea.innerHTML = "<p style='color:red;'>Erro na pesquisa: " + e.message + "</p>";
    }
}
