import { generatePricing } from "./api/generatePricing.js";
import { createPropertyCard } from "./utils/createPropertyCard.js";
import { getCityByNeighborhood } from "./api/getCityByNeighborhood.js";
import { getNeighborhoodById } from "./api/getNeighborhoodById.js";
import { generatePDF } from "./utils/generatePDF.js"; 
import { configs } from "./config/config.js";

let data;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        data = (await generatePricing(window.location.href)).data;

        if (data.LevelOfPricingAccuracy.nivel === '4') {
            window.location.href = window.origin + `${configs.domain_suffix}pages/insufficientData.html`;
            return;
        }

        const propertyPromises = data.propertiesUsedInProjection.map(async (property) => {
            let city = await getCityByNeighborhood(property.neighborhoodId);
            let neighborhoodAndType = [
                await getNeighborhoodById(property.neighborhoodId),
                property.type,
            ];
            let details = [
                property.usefulArea,
                property.dormitories,
                property.bathrooms,
                property.parkingSpaces,
                property.value,
                property.valuePerSquareMeter,
            ];

            let propertyCard = await createPropertyCard(city, neighborhoodAndType, details);
            document.querySelector('.container-informations').appendChild(propertyCard);
        });

        await Promise.all(propertyPromises);

        document.querySelector('.properties-used-in-the-study').innerHTML = `Quantidade de imóveis usados no estudo: <b>${data.propertiesUsedInProjection.length}</b>`;

        document.querySelector('.loading-screen').style.display = 'none';
    } catch (error) {
        console.log(error);
    }
});

document.querySelector('.generate-pdf').addEventListener('click', async () =>{
    data = await generatePricing(window.location.href);
    await generatePDF(data);
})

document.querySelector('.back').addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
});
