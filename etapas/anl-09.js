import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL09(alvo) {
    return await executarANL("ANL-09", "Relação com o Restante da Escritura", ["Beale", "Beale & Carson", "Vos", "Goldsworthy"], 
        `Analise citações, alusões, ecos e a história da redenção para: '${alvo}'.`);
}
