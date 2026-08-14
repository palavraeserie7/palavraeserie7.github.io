/**
 * ENGINE.JS - Conexão com o Gemini para Análise Teológica
 */
const API_KEY = "AQ.Ab8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w";

async function executarMotorIA(promptEtapa) {
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
    
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptEtapa }] }] } )
    });

    const dados = await resposta.json();
    if (dados.error) throw new Error(dados.error.message);
    return dados.candidates[0].content.parts[0].text;
}
