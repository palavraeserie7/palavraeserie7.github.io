export const anl01 = {
    id: "ANL-01",
    titulo: "TEXTO E MANUSCRITOS",
    isPro: false,
    itens: [
        "Identificação do texto base (Hebraico/Grego)",
        "Mapeamento de variantes textuais críticas",
        "Testemunhos textuais (Papiros, Unciais, Minúsculos)",
        "Consulta a aparatos críticos (NA28 / BHS / SBLGNT)"
    ],
    // Motor de execução eficiente para a ANL-01
    analisar(termo) {
        return `
            <div style="margin-bottom: 10px;">
                <strong style="color: #38bdf8;">Diretriz de Crítica Textual para: "${termo}"</strong>
            </div>
            <p style="margin-bottom: 8px;">Para executar a ANL-01 com eficiência sobre este termo ou passagem, siga esta verificação:</p>
            <ul style="padding-left: 20px; color: #cbd5e1; display: flex; flex-direction: column; gap: 6px;">
                <li><strong>1. Autógrafos e Manuscritos:</strong> Verifique no NA28 (Novo Testamento) ou BHS/BHQ (Antigo Testamento) se há divergências significativas entre as famílias textuais (Alexandrina, Bizantina, Ocidental).</li>
                <li><strong>2. Variantes Relevantes:</strong> Identifique se a variação altera a morfologia ou o sentido teológico ou se é apenas um erro ortográfico (itacismo).</li>
                <li><strong>3. Testemunhos Primários:</strong> Liste os principais suportes que sustentam a leitura original adotada.</li>
            </ul>
        `;
    }
};
