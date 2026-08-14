
import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function run01(alvo, contexto) {
    return await executarANL("ANL-01", "Texto", ["NA28", "BHS"], "Analise o texto para: " + alvo, contexto);
}
