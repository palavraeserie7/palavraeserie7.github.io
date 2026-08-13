import { anl01 } from './anl-01.js';
import { anl02 } from './anl-02.js';
import { anl03 } from './anl-03.js';
import { anl04 } from './anl-04.js';
import { anl05 } from './anl-05.js';
import { anl06 } from './anl-06.js';
import { anl07 } from './anl-07.js';
import { anl08 } from './anl-08.js';
import { anl09 } from './anl-09.js';
import { anl10 } from './anl-10.js';
import { anl11 } from './anl-11.js';
import { anl12 } from './anl-12.js';

const etapas = [anl01, anl02, anl03, anl04, anl05, anl06, anl07, anl08, anl09, anl10, anl11, anl12];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container') || document.body;
    
    let htmlContent = `
        <div style="margin-bottom:25px; background:#1e293b; padding:20px; border-radius:8px; border:1px solid #334155;">
            <h2 style="color:#22c55e; margin-bottom:10px;">Matriz de Análise Bíblica — Pesquisa Granular</h2>
            <p style="color:#94a3b8; font-size:14px; margin-bottom:15px;">Digite o termo e clique em qualquer critério técnico abaixo:</p>
            <input type="text" id="inputTermo" placeholder="Ex: verbo, temor..." style="width:100%; padding:12px; background:#0f172a; border:1px solid #475569; color:#fff; border-radius:6px; font-size:16px;">
        </div>
        <div id="listaEtapas">
    `;

    etapas.forEach(etapa => {
        htmlContent += `
            <div class="etapa-card" data-etapa="${etapa.id}" style="background:#1e293b; margin-bottom:12px; border-radius:8px; border:1px solid #334155; overflow:hidden;">
                <div class="etapa-header" style="padding:15px; cursor:pointer; display:flex; justify-content:space-between; align-items:center; background:#0f172a;">
                    <h3 style="color:#38bdf8; margin:0; font-size:16px;">${etapa.id} — ${etapa.titulo}</h3>
                    <span class="seta-icone" style="color:#22c55e; font-weight:bold; transition:transform 0.3s ease;">▼</span>
                </div>
                <div class="etapa-body" style="display:none; padding:15px; border-top:1px solid #334155; background:#1e293b;">
                    <p style="color:#94a3b8; font-size:13px; margin-bottom:10px;">Critérios técnicos da etapa:</p>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${etapa.itens.map(item => `
                            <button class="btn-criterio" data-etapa="${etapa.id}" data-item="${item}" style="background:#0f172a; color:#cbd5e1; border:1px solid #475569; text-align:left; padding:10px; border-radius:5px; cursor:pointer; font-size:14px; transition:all 0.2s;">
                                🔍 <strong>${item}</strong>
                            </button>
                        `).join('')}
                    </div>
                    <div class="resultado-criterio" style="margin-top:15px; display:none;"></div>
                </div>
            </div>
        `;
    });

    htmlContent += `</div>`;
    container.innerHTML = htmlContent;

    // Comportamento do Acordeão
    document.querySelectorAll('.etapa-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.etapa-card');
            const body = card.querySelector('.etapa-body');
            const arrow = card.querySelector('.seta-icone');
            
            const isOpen = body.style.display === "block";
            body.style.display = isOpen ? "none" : "block";
            arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
            card.style.borderColor = isOpen ? "#334155" : "#22c55e";
        });
    });

    // Captura o clique em cada critério técnico individual
    document.querySelectorAll('.btn-criterio').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const termoInput = document.getElementById('inputTermo').value.trim();
            const termo = termoInput !== "" ? termoInput : "termo geral";
            
            const etapaId = btn.getAttribute('data-etapa');
            const criterio = btn.getAttribute('data-item');

            const etapaObj = etapas.find(el => el.id === etapaId);
            const card = btn.closest('.etapa-card');
            const resBox = card.querySelector('.resultado-criterio');

            if (etapaObj && typeof etapaObj.analisar === 'function') {
                resBox.innerHTML = etapaObj.analisar(termo, criterio);
            } else {
                resBox.innerHTML = `<p style="color:#f87171;">Função de análise não encontrada para esta etapa.</p>`;
            }

            resBox.style.display = "block";
        });
    });
});
