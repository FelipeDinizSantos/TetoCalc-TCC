import { formatValueLocation } from "./formatValueLocation.js"; 

export async function createPropertyCard(
    city,
    neighborhoodAndType,
    details
){  
    let divSimulationResult = document.createElement('div');
    divSimulationResult.classList.add('simulation-result');

    let pCity = document.createElement('p');
    pCity.classList.add('city-estate');
    pCity.innerHTML = city;
    divSimulationResult.appendChild(pCity);

    let pNeighborhoodAndType = document.createElement('p');
    pNeighborhoodAndType.classList.add('type-neighborhood');
    pNeighborhoodAndType.innerHTML = `${neighborhoodAndType[1]} - ${neighborhoodAndType[0]}`;
    divSimulationResult.appendChild(pNeighborhoodAndType);

    let pDetails = document.createElement('p');
    pDetails.classList.add('property-details');
    pDetails.innerHTML = `${details[0]}m² <span>&#8901;</span> ${details[1]} Quartos <span>&#8901;</span> ${details[2]} Banheiro <span>&#8901;</span> ${details[3]} Vagas`;
    divSimulationResult.appendChild(pDetails);

    let pProjection = document.createElement('p');
    pProjection.classList.add('simulation-value');
    pProjection.innerHTML = `${formatValueLocation(details[4])}`;
    divSimulationResult.appendChild(pProjection);

    let divTextimage = document.createElement('div');
    divTextimage.classList.add('join-text-image');
    let imageInformationIcon = document.createElement('img');
    imageInformationIcon.src='../assets/Img/information.png';
    imageInformationIcon.classList.add('icon-information');
    divTextimage.appendChild(imageInformationIcon);

    let pValuePerSquareMeter = document.createElement('p');
    pValuePerSquareMeter.classList.add('icon-value-valuePerSquareMeter');
    pValuePerSquareMeter.innerHTML = `Valor por Metro Quadrado <b>${formatValueLocation(details[5])}</b>`
    divTextimage.appendChild(pValuePerSquareMeter);

    divSimulationResult.appendChild(divTextimage);
    return divSimulationResult;
}