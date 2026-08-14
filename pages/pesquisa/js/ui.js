import { run01 } from '../../../etapas/anl-01.js';
import { run02 } from '../../../etapas/anl-02.js';
// ... (importe até o 12) ...

async function iniciarMatriz() {
    const tema = document.getElementById('tema-input').value.trim();
    if (!tema) return alert("Digite um tema.");
    
    const container = document.getElementById('modules-container');
    container.innerHTML = "";
    let contexto = "";

    const modulos = [
        {id: "ANL-01", fn: run01}, {id: "ANL-02", fn: run02}, {id: "ANL-03", fn: run03},
        {id: "ANL-04", fn: run04}, {id: "ANL-05", fn: run05}, {id: "ANL-06", fn: run06},
        {id: "ANL-07", fn: run07}, {id: "ANL-08", fn: run08}, {id: "ANL-09", fn: run09},
        {id: "ANL-10", fn: run10}, {id: "ANL-11", fn: run11}, {id: "ANL-12", fn: run12}
    ];

    for (const m of modulos) {
        const div = document.createElement('div');
        div.className = "module open";
        div.innerHTML = `<div class="module-header"><span>${m.id}</span><span class="status">RUNNING</span></div>`;
        container.appendChild(div);

        const res = await m.fn(tema, contexto);
        div.querySelector('.status').innerText = res.status;
        div.innerHTML += `<div class="module-body">${res.resultado}</div>`;
        contexto += `\n[${m.id}]: ${res.resultado}\n`;
    }
}
document.getElementById('analisar-btn').onclick = iniciarMatriz;
