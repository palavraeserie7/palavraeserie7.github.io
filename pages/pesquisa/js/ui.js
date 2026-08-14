import { Router } from './router.js';
import * as Modulos from './loader.js'; // Ver abaixo como criar este loader

async function iniciarMatriz() {
    const tema = document.getElementById('tema-input').value.trim();
    const passagem = document.getElementById('passagem-input').value.trim();
    if (!tema && !passagem) return alert("Informe um tema.");

    const diagArea = document.getElementById('diagnostico-area');
    const modulesArea = document.getElementById('modules-container');
    const resultArea = document.getElementById('resultado-area');

    // ANL-00 Roteamento
    const rota = Router.classificar(tema, passagem);
    diagArea.innerHTML = `<div class="diag-item"><small>TESTAMENTO</small><strong>${rota.testamento}</strong></div>`;

    let contextoAcumulado = "";
    modulesArea.innerHTML = "";

    const lista = [
        {id: "ANL-01", fn: Modulos.run01}, {id: "ANL-02", fn: Modulos.run02},
        {id: "ANL-03", fn: Modulos.run03}, {id: "ANL-04", fn: Modulos.run04},
        {id: "ANL-05", fn: Modulos.run05}, {id: "ANL-06", fn: Modulos.run06},
        {id: "ANL-07", fn: Modulos.run07}, {id: "ANL-08", fn: Modulos.run08},
        {id: "ANL-09", fn: Modulos.run09}, {id: "ANL-10", fn: Modulos.run10},
        {id: "ANL-11", fn: Modulos.run11}, {id: "ANL-12", fn: Modulos.run12}
    ];

    for (const m of lista) {
        const div = document.createElement('div');
        div.className = "module open";
        div.innerHTML = `<div class="module-header"><span class="module-title">${m.id}</span><span class="module-status">RUNNING</span></div>`;
        modulesArea.appendChild(div);

        try {
            const res = await m.fn(tema + " " + passagem, contextoAcumulado);
            div.querySelector('.module-status').innerText = res.review_required ? "REVIEW_REQUIRED" : "COMPLETED";
            div.querySelector('.module-status').style.color = res.review_required ? "orange" : "#20d66b";
            
            contextoAcumulado += `\n[${m.id}]: ${res.resultado}\n`;
            div.innerHTML += `<div class="module-body">${res.resultado}</div>`;
        } catch (e) {
            div.querySelector('.module-status').innerText = "ERROR";
            break;
        }
    }
    resultArea.innerHTML = `<h2>Dossiê Final</h2><div class="research-box">${contextoAcumulado}</div>`;
    resultArea.style.display = "block";
}
document.getElementById('analisar-btn').onclick = iniciarMatriz;
