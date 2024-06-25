import { configs } from "../config/config.js";

export async function generatePricing(url) {
    const urlString = String(url);
    const queryIndex = urlString.indexOf('?');
    const params = urlString.slice(queryIndex + 1);
    let response;

    try {
        response = await fetch(configs.api_url + '?' + params);

        if (!response.ok) {
            throw new Error(`Response Network Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        let errorMessage;

        switch (response.status) {
            case 400:
                errorMessage = "Requisição inválida (400). Por favor, verifique os dados enviados e tente novamente.";
                break;
            case 404:
                errorMessage = "Página não encontrada (404). Verifique a URL e tente novamente.";
                break;
            case 500:
                errorMessage = "Erro interno do servidor (500). Por favor, tente novamente mais tarde.";
                break;
            default:
                errorMessage = `Erro: ${response.status}. Por favor, tente novamente.`;
        }
        
        window.location.href= window.origin + `${configs.domain_suffix}/pages/errors.html?errorMessage=${errorMessage}`;
    }
}
