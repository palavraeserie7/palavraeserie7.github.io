/**
 * ENGINE.JS — Motor de Execução da Matriz
 * Gerencia a chamada ao Gemini com isolamento de contexto para cada ANL.
 */
const API_KEY = "AIzaSyAb8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w";

export async function executarANL(moduloId, nomeModulo, fontes, promptEspecifico) {
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
    
    const promptMestre = `Você é o módulo exegético oficial ${moduloId} (${nomeModulo} ) da Matriz de Análise Bíblica Palavra & Série.
Fontes autorizadas para esta etapa: ${fontes.join(", ")}.
Instrução específica: ${promptEspecifico}
Responda em Português de forma técnica, rigorosa, acadêmica e fundamentada exclusivamente nas fontes do seu módulo.`;

    try {
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptMestre }] }] })
        });

        const dados = await resposta.json();
        if (dados.error) throw new Error(dados.error.message);
        
        return {
            status: "COMPLETED",
            confianca: "ALTA",
            resultado: dados.candidates[0].content.parts[0].text,
            fontesUtilizadas: fontes
        };
    } catch (e) {
        return {
            status: "ERROR",
            confianca: "INDETERMINADA",
            resultado: "Falha na execução do módulo: " + e.message,
            fontesUtilizadas: fontes
        };
    }
}
