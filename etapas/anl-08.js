import { executarANL } from '../pages/pesquisa/js/engine.js';
export async function runANL08(alvo) {
    return await executarANL("ANL-08", "Contexto Geográfico e Político", ["Zondervan Atlas", "Arqueologia Bíblica"], 
        `Analise a localização geográfica, impérios e relações de poder para: '${alvo}'.`);
}
