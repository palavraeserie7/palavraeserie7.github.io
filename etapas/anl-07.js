import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL07(alvo) {
    return await executarANL("ANL-07", "Contexto Histórico e Cultural", ["IVP Bible Background", "Zondervan Encyclopedia", "Manners and Customs"], 
        `Investigue o mundo sociocultural, costumes e religião do ambiente de: '${alvo}'.`);
}
