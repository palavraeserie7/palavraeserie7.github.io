import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL05(alvo) {
    return await executarANL("ANL-05", "Significado Teológico", ["NIDNTTE", "NIDOTTE", "TDNT", "TDOT"], 
        `Analise o desenvolvimento conceitual e teológico dos termos para: '${alvo}'.`);
}
