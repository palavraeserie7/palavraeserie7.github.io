import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL11(alvo) {
    return await executarANL("ANL-11", "Teologia e Comparação", ["Grudem", "Berkhof", "Frame", "EDT"], 
        `Confronte as evidências obtidas com a teologia sistemática e história da interpretação para: '${alvo}'.`);
}
