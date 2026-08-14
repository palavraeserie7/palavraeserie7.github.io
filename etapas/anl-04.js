import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL04(alvo) {
    return await executarANL("ANL-04", "Palavras e Semântica", ["BDAG", "HALOT", "BDB", "LSJ"], 
        `Analise o campo semântico e o sentido contextual das palavras-chave para: '${alvo}'.`);
}
