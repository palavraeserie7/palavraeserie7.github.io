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
    // Motor granular que responde especificamente ao critério técnico clicado
    analisar(termo, criterio) {
        return `
            <div style="margin-bottom: 10px;">
                <strong style="color: #38bdf8;">Diretriz ANL-01 para "${termo}"</strong><br>
                <span style="font-size: 13px; color: #94a3b8;">Foco no critério técnico: <em>${criterio}</em></span>
            </div>
            <div style="background: #0f172a; padding: 12px; border-radius: 6px; border-left: 3px solid #22c55e; color: #e2e8f0; font-size: 14px; line-height: 1.5;">
                ${this.obterConteudoCriterio(criterio, termo)}
            </div>
        `;
    },
    
    obterConteudoCriterio(criterio, termo) {
        switch(criterio) {
            case "Identificação do texto base (Hebraico/Grego)":
                return `Verifique se o termo <strong>"${termo}"</strong> ocorre no Texto Massorético (BHS) para o Antigo Testamento ou no SBLGNT/NA28 para o Novo Testamento, isolando o lema original.`;
            case "Mapeamento de variantes textuais críticas":
                return `Consulte os aparatos textuais para identificar se existem divergências significativas nos manuscritos antigos para o termo <strong>"${termo}"</strong>.`;
            case "Testemunhos textuais (Papiros, Unciais, Minúsculos)":
                return `Liste os principais suportes manuscritos que sustentam a leitura original onde <strong>"${termo}"</strong> aparece (ex: P66, P75, Codex Sinaiticus).`;
            case "Consulta a aparatos críticos (NA28 / BHS / SBLGNT)":
                return `Analise as notas críticas de rodapé no NA28 ou BHS/BHQ para certificar o grau de certeza textual da ocorrência de <strong>"${termo}"</strong>.`;
            default:
                return `Aplicação da diretriz técnica de Crítica Textual para o termo <strong>"${termo}"</strong> com base nos padrões acadêmicos da ANL-01.`;
        }
    }
};
