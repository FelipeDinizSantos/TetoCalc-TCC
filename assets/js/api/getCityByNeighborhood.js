import { configs } from "../config/config.js";

export async function getCityByNeighborhood(neighborhoodId){
    try {
        const apiUrl = configs.api_url;
        const baseUrl = apiUrl.split('/api/')[0] + '/api/neighborhoods';

        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error(`Response Network Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const cityName = data.neighborhoods.find(neighborhood => neighborhood.id === neighborhoodId).city.name;

        return cityName;
    } catch (error) {
        console.error('Houve um problema na requisição: ', error);
    }
}