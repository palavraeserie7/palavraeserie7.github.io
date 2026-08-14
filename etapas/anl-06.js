import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL06(alvo) {
    return await executarANL("ANL-06", "Exegese e Contexto Literário", ["BECNT", "NICNT", "NICOT", "Pillar", "WBC"], 
        `Determine a intenção comunicativa, gênero e contexto literário imediato para: '${alvo}'.`);
}
