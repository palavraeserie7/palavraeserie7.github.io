import { Router } from './router.js';
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
    const btn = document.getElementById('btn-analisar');
    if (btn) btn.addEventListener('click', iniciarMatriz);
});

async function iniciarMatriz() {
    const tema = document.getElementById('tema').value.trim();
    const passagem = document.getElementById('passagem').value.trim();
    if (!tema && !passagem) { alert("Informe um tema ou passagem."); return; }

    const alvo = tema + (passagem ? " (" + passagem + ")" : "");
    const diag = document.getElementById('diagnostico');
    const container = document.getElementById('modules-container');
    const area = document.getElementById('research-area');

    diag.innerHTML = '<div>Executando ANL-00 (Roteamento)...</div>';
    container.innerHTML = '<div class="empty">Acionando os 12 módulos ANL independentes...</div>';
    area.innerHTML = '<div class="empty">Aguardando consolidação da base de evidências...</div>';

    // ANL-00 Diagnóstico
    const diagnostico = Router.classificar(tema, passagem);
    diag.innerHTML = `
        <div class="diagnostico-item"><small>Testamento</small><strong>${diagnostico.testamento}</strong></div>
        <div class="diagnostico-item"><small>Idioma</small><strong>${diagnostico.idiomaPrimario}</strong></div>
        <div class="diagnostico-item"><small>Gênero</small><strong>${diagnostico.generoLiterario}</strong></div>
        <div class="diagnostico-item"><small>Status</small><strong style="color:#20d66b;">${diagnostico.statusRoteamento}</strong></div>
    `;

    const modulosList = [
        { id: "ANL-01", fn: runANL01 },
        { id: "ANL-02", fn: runANL02 },
        { id: "ANL-03", fn: runANL03 },
        { id: "ANL-04", fn: runANL04 },
        { id: "ANL-05", fn: runANL05 },
        { id: "ANL-06", fn: runANL06 },
        { id: "ANL-07", fn: runANL07 },
        { id: "ANL-08", fn: runANL08 },
        { id: "ANL-09", fn: runANL09 },
        { id: "ANL-10", fn: runANL10 },
        { id: "ANL-11", fn: runANL11 },
        { id: "ANL-12", fn: runANL12 }
    ];

    container.innerHTML = "";
    let dossiêCompleto = "";

    for (let m of modulosList) {
        const divMod = document.createElement('div');
        divMod.className = "module open";
        divMod.innerHTML = `
            <div class="module-header">
                <span class="module-title">${m.id} — Executando...</span>
                <span class="module-status">RUNNING</span>
            </div>
            <div class="module-body"><div class="empty">Consultando fontes acadêmicas...</div></div>
        `;
        container.appendChild(divMod);

        try {
            const res = await m.fn(alvo);
            divMod.querySelector('.module-title').innerText = `${m.id} — Concluído`;
            divMod.querySelector('.module-status').innerText = res.status;
            divMod.querySelector('.module-status').style.borderColor = "#20d66b";
            divMod.querySelector('.module-body').innerHTML = `
                <p><strong>Fontes:</strong> ${res.fontesUtilizadas.join(", ")}</p>
                <div style="white-space: pre-wrap; margin-top:10px;">${res.resultado}</div>
            `;
            dossiêCompleto += `\n\n### ${m.id}\n${res.resultado}`;
        } catch (err) {
            divMod.querySelector('.module-status').innerText = "ERROR";
            divMod.querySelector('.module-status').style.borderColor = "#ff4d4d";
            divMod.querySelector('.module-body').innerHTML = `<p style="color:#ff4d4d;">Erro: ${err.message}</p>`;
        }
    }

    area.innerHTML = `
        <h2>Base de Evidências e Síntese Validada</h2>
        <div class="research-box">
            <div style="white-space: pre-wrap; line-height:1.7;">${dossiêCompleto}</div>
        </div>
    `;
}
