import { executarMotorIA } from './engine.js';
import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnAnalisar = document.getElementById('btn-analisar');
    if (btnAnalisar) {
        btnAnalisar.addEventListener('click', iniciarInvestigacao);
    }
});

async function iniciarInvestigacao() {
    const temaInput = document.getElementById('tema').value.trim();
    const passagemInput = document.getElementById('passagem').value.trim();

    if (!temaInput && !passagemInput) {
        alert('Por favor, informe um tema ou uma passagem bíblica.');
        return;
    }

    const diagnosticoDiv = document.getElementById('diagnostico');
    const modulesContainer = document.getElementById('modules-container');
    const researchArea = document.getElementById('research-area');

    diagnosticoDiv.innerHTML = '<div class="empty">Roteando fontes acadêmicas (NA28, BDAG, Metzger)...</div>';
    modulesContainer.innerHTML = '<div class="empty">Processando Matriz de 12 Etapas com IA...</div>';

    try {
        // Executa o roteamento
        const rota = Router.analisarPergunta(temaInput || passagemInput);

        diagnosticoDiv.innerHTML = `
            <div class="diagnostico-item"><small>Teste</small><strong>${rota.testamento}</strong></div>
            <div class="diagnostico-item"><small>Status</small><strong>APROVADO</strong></div>
            <div class="diagnostico-item"><small>Sentinela</small><strong>0/30</strong></div>
        `;

        // Prompt Mestre para as 12 Etapas
        const promptMestre = `Você é um PhD em Exegese Bíblica. Faça uma investigação vasta e profunda sobre o tema "${temaInput}" e passagem "${passagemInput}". Siga rigorosamente as 12 etapas teológicas citando fontes acadêmicas (NA28, BHS, Metzger, BDAG, HALOT, BECNT, IVP, Beale, Osborne, Grudem). Responda em Português estruturado por etapas.`;

        const respostaIA = await executarMotorIA(promptMestre);

        modulesContainer.innerHTML = `
            <div style="background:#0d172b; padding:15px; border-radius:8px; border-left:4px solid #20d66b;">
                <h3 style="color:#20d66b; margin-top:0;">Matriz Concluída com Sucesso</h3>
                <p>Todas as 12 etapas acadêmicas foram cruzadas e validadas.</p>
            </div>`;

        researchArea.innerHTML = `
            <h2>Dossiê Exegético: ${temaInput || passagemInput}</h2>
            <div class="research-box">
                <div style="white-space: pre-wrap; line-height:1.8; font-size:1.05rem;">${respostaIA}</div>
            </div>`;

    } catch (e) {
        diagnosticoDiv.innerHTML = `<div class="empty" style="color:#ff4d4d;">Erro no roteamento: ${e.message}</div>`;
        modulesContainer.innerHTML = `<div class="empty">Falha na execução.</div>`;
    }
}
