import { generatePricing } from "./api/generatePricing.js";
import { formatValueLocation } from "./utils/formatValueLocation.js"; 
import { calculateValuePerSquareMeter } from "./utils/calculateValuePerSquareMeter.js";
import { getCityByNeighborhood } from "./api/getCityByNeighborhood.js";
import { getNeighborhoodById } from "./api/getNeighborhoodById.js";
import { configs } from "./config/config.js";

async function loadPricingData() {
    try {
        const data = await generatePricing(window.location.href);

        let projection;
        let valuePerSquareMeter;
        let negotiationType;
        let propertieContainer;

        if (data.data.LevelOfPricingAccuracy.nivel === '4') {
            negotiationType = document.querySelector('.sales-projection');
            negotiationType.innerHTML = `Projeção de ${data.data.targetProperty.negotiation === 'LOCACAO' ? 'Locação' : 'Venda'}`;

            projection = document.querySelector('.value');
            valuePerSquareMeter = document.querySelector('.valuePerSquareMeter');

            projection.innerHTML = `${formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]] * data.data.targetProperty.usefulArea)}${data.data.targetProperty.negotiation === 'LOCACAO' ? '/mês' : ''}`;
            valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]])}</b>`;

            document.querySelector('.title-simulation').innerHTML='Método Utilizado: ';
            propertieContainer = document.querySelectorAll('.property-container')[0].querySelector('.simulation-result-1').innerHTML="<h2> Cálculo interno. </h2>";

            const savePricingLink = document.querySelector('.save-pricing');
            if (savePricingLink) {
                savePricingLink.parentElement.removeChild(savePricingLink);
            }
        } else {
            negotiationType = document.querySelector('.sales-projection');
            negotiationType.innerHTML = `Projeção de ${data.data.targetProperty.negotiation === 'LOCACAO' ? 'Locação' : 'Venda'}`;

            projection = document.querySelector('.value');
            valuePerSquareMeter = document.querySelector('.valuePerSquareMeter');

            projection.innerHTML = `${formatValueLocation(data.data.projectedValueOfTheProperty)}${data.data.targetProperty.negotiation === 'LOCACAO' ? '/mês' : ''}`;
            valuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(calculateValuePerSquareMeter(data.data.projectedValueOfTheProperty, data.data.targetProperty.usefulArea))}</b>`;

            propertieContainer = document.querySelectorAll('.property-container');
            propertieContainer[0].querySelector('.city-estate').innerHTML = await getCityByNeighborhood(data.data.propertiesUsedInProjection[0].neighborhoodId);
            propertieContainer[0].querySelector('.type-neighborhood').innerHTML = `${data.data.propertiesUsedInProjection[0].type} - ${await getNeighborhoodById(data.data.propertiesUsedInProjection[0].neighborhoodId)}`;
            propertieContainer[0].querySelector('.property-details').innerHTML = `${data.data.propertiesUsedInProjection[0].usefulArea}m² <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].dormitories} Quartos <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].bathrooms} Banheiros <span>&#8231;</span> ${data.data.propertiesUsedInProjection[0].parkingSpaces} Vagas`;
            propertieContainer[0].querySelector('.simulation-value').innerHTML = `${formatValueLocation(data.data.propertiesUsedInProjection[0].value)}`;
            propertieContainer[0].querySelector('.icon-value-valuePerSquareMeter').innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(data.data.propertiesUsedInProjection[0].valuePerSquareMeter)}</b>`;
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
    document.querySelector('.save-pricing').addEventListener('click', handleSavePricingClick);
});
