import { generatePricing } from "./api/generatePricing.js";
import { formatValueLocation } from "./utils/formatValueLocation.js"; 
import { calculateValuePerSquareMeter } from "./utils/calculateValuePerSquareMeter.js";
import { getCityByNeighborhood } from "./api/getCityByNeighborhood.js";
import { getNeighborhoodById } from "./api/getNeighborhoodById.js";
import { configs } from "./config/config.js";

document.addEventListener('DOMContentLoaded', async () => {
    let data;
    try {

        data = await generatePricing(window.location.href);

        if(data.data.LevelOfPricingAccuracy.nivel === '4'){
            window.location.href= window.origin + `${configs.domainSuffix}pages/insufficientData.html`;
            return;
        }
    
        let projection;
        let valuePerSquareMeter;
        let negotiationType;
        let propertieContainer;
        
        negotiationType = document.querySelector('.sales-projection');
        negotiationType.innerHTML = `Projeção de ${data.data.targetProperty.negotiation === 'LOCACAO'?'Locação':'Venda'}`

        projection = document.querySelector('.value');
        valuePerSquareMeter = document.querySelector('.valuePerSquareMeter');

        projection.innerHTML = `${formatValueLocation(data.data.projectedValueOfTheProperty)}${data.data.targetProperty.negotiation === 'LOCACAO'?'/mês':''}`;
        valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(calculateValuePerSquareMeter(data.data.projectedValueOfTheProperty, data.data.targetProperty.usefulArea))}</b>`;

        propertieContainer = document.querySelectorAll('.property-container');
        propertieContainer[0].querySelector('.city-estate').innerHTML = await getCityByNeighborhood(data.data.propertiesUsedInProjection[0].neighborhoodId);
        propertieContainer[0].querySelector('.type-neighborhood').innerHTML = `${data.data.propertiesUsedInProjection[0].type} - ${await getNeighborhoodById(data.data.propertiesUsedInProjection[0].neighborhoodId)}`;
        propertieContainer[0].querySelector('.property-details').innerHTML = `${data.data.propertiesUsedInProjection[0].usefulArea}m² <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].dormitories} Quartos <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].bathrooms} Banheiros <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].parkingSpaces} Vagas`;
        propertieContainer[0].querySelector('.simulation-value').innerHTML = `${formatValueLocation(data.data.propertiesUsedInProjection[0].value)}`;
        propertieContainer[0].querySelector('.icon-value-valuePerSquareMeter').innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(data.data.propertiesUsedInProjection[0].valuePerSquareMeter)}</b>`;

    }catch (error) {
        console.log(error);
    }finally{
        document.querySelector('.loading-screen').style.display='none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.loading-screen p');
    const text = textElement.textContent;
    textElement.innerHTML = text.split('').map((char) => `<span>${char}</span>`).join('');
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement =document.querySelector('.loading-screen p');
    const text = textElement.textContent;
    textElement.innerHTML = text.split('').map((char) => `<span>${char}</span>`).join('');
});