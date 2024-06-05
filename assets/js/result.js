import { generatePricing } from "./api/generatePricing.js";
import { formatValueLocation } from "./utils/formatValueLocation.js"; 
import { calculateValuePerSquareMeter } from "./utils/calculateValuePerSquareMeter.js";
import { getCityByNeighborhood } from "./api/getCityByNeighborhood.js";

window.addEventListener('load', async ()=>{
    let data;
    let projection;
    let valuePerSquareMeter;
    let negotiationType;
    let propertieContainer;

    try {
        data = await generatePricing(window.location.href);
        
        if(data.data.LevelOfPricingAccuracy.nivel === '4') window.location.href= window.origin + '/pages/insufficientData.html';
    } catch (error) {
        console.log(error);
    }
    
    negotiationType = document.querySelector('.sales-projection');
    negotiationType.innerHTML = `Projeção de ${data.data.targetProperty.negotiation === 'LOCACAO'?'Locação':'Venda'}`

    projection = document.querySelector('.value');
    valuePerSquareMeter = document.querySelector('.valuePerSquareMeter');

    projection.innerHTML = `${formatValueLocation(data.data.projectedValueOfTheProperty)}${data.data.targetProperty.negotiation === 'LOCACAO'?'/mês':''}`;
    valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(calculateValuePerSquareMeter(data.data.projectedValueOfTheProperty, data.data.targetProperty.usefulArea))}</b>`;

    propertieContainer = document.querySelectorAll('.property-container');
    propertieContainer[0].querySelector('.city-estate').innerHTML = await getCityByNeighborhood(data.data.propertiesUsedInProjection[0].neighborhoodId);
    propertieContainer[1].querySelector('.city-estate').innerHTML = await getCityByNeighborhood(data.data.propertiesUsedInProjection[1].neighborhoodId);

// import { configs } from "../config/config.js";

// export async function getCityByNeighborhood(neighborhoodId){
//     try {
//         const apiUrl = configs.api_url;
//         const baseUrl = apiUrl.split('/api/')[0] + '/api/neighborhoods';
//         console.log(baseUrl);

//         const response = await fetch(baseUrl);

//         if (!response.ok) {
//             throw new Error(`Response Network Error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error('Houve um problema na requisição: ', error);
//     }
// }
})