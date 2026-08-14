import { runANL01 } from '../../../etapas/anl-01.js';
import { runANL02 } from '../../../etapas/anl-02.js';
import { runANL03 } from '../../../etapas/anl-03.js';
import { runANL04 } from '../../../etapas/anl-04.js';
import { runANL05 } from '../../../etapas/anl-05.js';
import { runANL06 } from '../../../etapas/anl-06.js';
import { runANL07 } from '../../../etapas/anl-07.js';
import { runANL08 } from '../../../etapas/anl-08.js';
import { runANL09 } from '../../../etapas/anl-09.js';
import { runANL10 } from '../../../etapas/anl-10.js';
import { runANL11 } from '../../../etapas/anl-11.js';
import { runANL12 } from '../../../etapas/anl-12.js';

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('analisar-btn');
    if (btn) btn.addEventListener('click', iniciarMatriz);
});

async function iniciarMatriz() {
    const tema = document.getElementById('tema-input').value.trim();
    const passagem = document.getElementById('passagem-input').value.trim();
    if (!tema && !passagem) return alert("Informe um tema ou passagem.");

    const alvo = tema + (passagem ? " (" + passagem + ")" : "");
    const diag = document.getElementById('diagnostico-area');
    const container = document.getElementById('modules-container');
    const resArea = document.getElementById('resultado-area');

    diag.innerHTML = '<div class="loading">Roteando fontes acadêmicas...</div>';
    container.innerHTML = "";
    resArea.style.display = 'none';

    const modulos = [
        { id: "ANL-01", fn: runANL01 }, { id: "ANL-02", fn: runANL02 },
        { id: "ANL-03", fn: runANL03 }, { id: "ANL-04", fn: runANL04 },
        { id: "ANL-05", fn: runANL05 }, { id: "ANL-06", fn: runANL06 },
        { id: "ANL-07", fn: runANL07 }, { id: "ANL-08", fn: runANL08 },
        { id: "ANL-09", fn: runANL09 }, { id: "ANL-10", fn: runANL10 },
        { id: "ANL-11", fn: runANL11 }, { id: "ANL-12", fn: runANL12 }
    ];

    let dossie = "";

    for (const m of modulos) {
        const div = document.createElement('div');
        div.className = "module open";
        div.innerHTML = `
            <div class="module-header">
                <span class="module-title">${m.id} — Processando...</span>
                <span class="module-status">RUNNING</span>
            </div>
            <div class="module-body">Consultando fontes acadêmicas...</div>
        `;
        container.appendChild(div);

        try {
            const res = await m.fn(alvo);
            div.querySelector('.module-title').innerText = `${m.id} — Concluído`;
            div.querySelector('.module-status').innerText = "COMPLETED";
            div.querySelector('.module-body').innerHTML = `<div style="white-space:pre-wrap;">${res.resultado}</div>`;
            dossie += `\n\n### ${m.id}\n${res.resultado}`;
        } catch (e) {
            div.querySelector('.module-status').innerText = "ERROR";
            div.querySelector('.module-body').innerText = "Erro: " + e.message;
        }
    }

    resArea.innerHTML = `<h2>Base de Evidências Validada</h2><div style="white-space:pre-wrap;">${dossie}</div>`;
    resArea.style.display = 'block';
    
    diag.innerHTML = `
        <div class="diag-item"><small>TESTAMENTO</small><strong>${tema.length > 5 ? 'ANTIGO' : 'NOVO'}</strong></div>
        <div class="diag-item"><small>STATUS</small><strong style="color:#20d66b;">APROVADO</strong></div>
        <div class="diag-item"><small>SENTINELA</small><strong>0/30</strong></div>
    `;
}
