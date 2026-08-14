import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL10(alvo) {
    return await executarANL("ANL-10", "Hermenêutica e Controle", ["Osborne", "Carson", "Fee & Stuart"], 
        `Faça o controle metodológico contra eisegese, falácias lexicais e anacronismos para: '${alvo}'.`);
}
