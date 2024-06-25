import { generatePricing } from "./api/generatePricing.js";
import { formatValueLocation } from "./utils/formatValueLocation.js"; 
import { calculateValuePerSquareMeter } from "./utils/calculateValuePerSquareMeter.js";
import { getCityByNeighborhood } from "./api/getCityByNeighborhood.js";
import { getNeighborhoodById } from "./api/getNeighborhoodById.js";
import { generatePDF } from "./utils/generatePDF.js";
import { configs } from "./config/config.js";

let data;

async function loadPricingData() {
    try {
        data = await generatePricing(window.location.href);

        let valuePerSquareMeter;

        const studyLevel = document.querySelector('.study-level');
        studyLevel.innerHTML = data.data.LevelOfPricingAccuracy.nivel;

        switch(data.data.LevelOfPricingAccuracy.nivel){
            case '1':
                studyLevel.classList.add('high-level');
                break;
            case '2':
                studyLevel.classList.add('medium-level');
                break;
            case '3':
                studyLevel.classList.add('low-level');
                break;
            case '4':
                studyLevel.classList.add('insufficient-level');
                break;
        }

        const negotiationType = document.querySelector('.sales-projection');
        negotiationType.innerHTML = `Projeção de ${data.data.targetProperty.negotiation === 'LOCACAO' ? 'Locação' : 'Venda'}`;

        const projection = document.querySelector('.value');
        valuePerSquareMeter = document.querySelector('.valuePerSquareMeter');

        const propertyDetails = document.querySelector('.property-datails');
        propertyDetails.innerHTML = `${data.data.targetProperty.dormitories} Quartos | ${data.data.targetProperty.bathrooms} Banheiros`;
        if(data.data.targetProperty.suites) propertyDetails.innerHTML += ` | ${data.data.targetProperty.suites} Suites`;
        if(data.data.targetProperty.parkingSpaces) propertyDetails.innerHTML += ` | ${data.data.targetProperty.parkingSpaces} Vagas`;

        const propertyLocation = document.querySelector('.property-location');
        const city = await getCityByNeighborhood(data.data.targetProperty.neighborhoodId);
        const neighborhood = await getNeighborhoodById(data.data.targetProperty.neighborhoodId);
        propertyLocation.innerHTML = `${data.data.targetProperty.type.toLocaleLowerCase()} ${data.data.targetProperty.typeStructure.toLocaleLowerCase()} - ${neighborhood.toLocaleLowerCase()}, ${city.toLocaleLowerCase()} - SP`;

        if (data.data.LevelOfPricingAccuracy.nivel === '4') {
            projection.innerHTML = `${formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]] * data.data.targetProperty.usefulArea)}${data.data.targetProperty.negotiation === 'LOCACAO' ? '/mês' : ''}`;
            valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]])}</b>`;

            const propertiesUsed = document.querySelector('.properties-used');
            propertiesUsed.innerHTML = `Imóveis usados para avaliação: <strong>0</strong><br />Calculo interno utilizado.`;

            const savePricingLink = document.querySelector('.save-pricing');
            if (savePricingLink) {
                savePricingLink.parentElement.removeChild(savePricingLink);
            }

        } else {
            const propertiesUsed = document.querySelector('.properties-used');
            propertiesUsed.innerHTML = `Imóveis usados para avaliação: <strong>${data.data.propertiesUsedInProjection.length}</strong>`;

            projection.innerHTML = `${formatValueLocation(data.data.projectedValueOfTheProperty)}${data.data.targetProperty.negotiation === 'LOCACAO' ? '/mês' : ''}`;
            valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(calculateValuePerSquareMeter(data.data.projectedValueOfTheProperty, data.data.targetProperty.usefulArea))}</b>`;
        }

    } catch (error) {
        console.log(error);
    } finally {
        document.querySelector('.loading-screen').style.display = 'none';
    }
}

function handleSavePricingClick(e) {
    e.preventDefault();

    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    let path = `${configs.domain_suffix}pages/dataDescription.html?${params.toString()}`;
    window.location.href = window.location.origin + path;
}

function animateLoadingText() {
    const textElement = document.querySelector('.loading-screen p');
    const text = textElement.textContent;
    textElement.innerHTML = text.split('').map((char) => `<span>${char}</span>`).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    loadPricingData();
    animateLoadingText();
    document.querySelector('.generate-pdf').addEventListener('click', async () => await generatePDF(data));
    document.querySelector('.save-pricing').addEventListener('click', handleSavePricingClick);
});
