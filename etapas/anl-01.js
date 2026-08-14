
import { executarANL } from '../pages/pesquisa/js/engine.js'; export async function run01(alvo, contexto) { return await executarANL("ANL-01", "Texto e Manuscritos", ["NA28", "BHS", "Septuaginta"], "Estabeleça o texto crítico para: " + alvo, contexto); }
