/**
 * ENGINE.JS - Conexão com o Gemini (VERSÃO CORRIGIDA)
 */
// A chave deve começar obrigatoriamente com AIzaSy
const API_KEY = "AIzaSyAb8RN6Iy6_8ECP5Fyr5HMHuRuAF0whBOEKW67Vgh4CSgEUSq8w";

export async function executarMotorIA(promptEtapa) {
    const url = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY;
    
    const resposta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            contents: [{ 
                parts: [{ text: promptEtapa }] 
            }] 
        } )
    });

    const dados = await resposta.json();
    
    // Se houver erro na API, ele será detalhado aqui
    if (dados.error) {
        throw new Error(dados.error.message);
    }
    
    return dados.candidates[0].content.parts[0].text;
}
