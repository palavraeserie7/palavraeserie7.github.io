
import { executarANL } from '../pages/pesquisa/js/engine.js'; export async function run11(alvo, contexto) { return await executarANL("ANL-11", "Teologia e Comparação", ["Grudem", "Berkhof"], "Confronte evidências com a teologia sistemática de: " + alvo, contexto); }
