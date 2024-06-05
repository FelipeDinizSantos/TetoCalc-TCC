import { configs } from "../config/config.js";

export async function requestAPI(url) {
    const urlString = String(url);
    const queryIndex = urlString.indexOf('?');
    const params = urlString.slice(queryIndex + 1);

    try {
        const response = await fetch(configs.api_url + '?' + params);

        if (!response.ok) {
            throw new Error(`Response Network Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Houve um problema na requisição: ', error);
    }
}