import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL03(alvo) {
    return await executarANL("ANL-03", "Gramática e Sintaxe", ["Wallace", "Joüon", "Sintaxe Grega/Hebraica"], 
        `Analise a morfologia, sintaxe, verbos e relações sintáticas para: '${alvo}'.`);
}
