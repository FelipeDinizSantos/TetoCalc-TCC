import { configs } from "../js/config/config.js";

async function getNeighborhood(){
    try {
        const urlString = String(window.location.href);
        const queryIndex = urlString.indexOf('?');
        const paramsString = urlString.slice(queryIndex + 1);

        const params = new URLSearchParams(paramsString);

        const apiUrl = configs.api_url;
        const baseUrl = apiUrl.split('/api/')[0] + '/api/neighborhoods';

        const response = await fetch(baseUrl);

        if (!response.ok) {
            throw new Error(`Response Network Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const neighborhood = data.neighborhoods.find(neighborhood => neighborhood.id === params.get('neighborhoodId'));

        return neighborhood;
    }catch(error){
        console.log(error);
    }
}

async function loadNeighborhoodData() {
    try{
        const data = await getNeighborhood();

        console.log(data);

        document.querySelector('.cityName').innerHTML = data.city.name;
        document.querySelector('.neighborhoodName').innerHTML = data.name;
        document.querySelector('.neighborhoodDescription').innerHTML = data.description;
    } catch (error) {
        console.log(error);
    } finally {
        document.querySelector('.loading-screen').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNeighborhoodData();
});