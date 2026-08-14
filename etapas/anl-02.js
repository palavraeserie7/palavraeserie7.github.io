import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL02(alvo) {
    return await executarANL("ANL-02", "Tradução e Texto Original", ["LXX", "Traduções Comparadas", "Equivalências"], 
        `Analise o idioma original e diferenças significativas de tradução para: '${alvo}'.`);
}
