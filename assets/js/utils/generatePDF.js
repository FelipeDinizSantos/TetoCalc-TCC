import { formatDate } from './fomatDate.js';
import { formatValueLocation } from "./formatValueLocation.js"; 
import { getCityByNeighborhood } from "../api/getCityByNeighborhood.js";
import { getNeighborhoodById } from "../api/getNeighborhoodById.js";

export async function generatePDF(data){
    const canaaLogo = new Image();
    canaaLogo.src = '/assets/Img/main_logo_canaa.png';

    let doc = new jsPDF();

    doc.addImage(canaaLogo, 'PNG', 15, 7, 80, 20);
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`ESTUDO MERCADOLÓGICO DE ${data.data.targetProperty.negotiation === 'LOCACAO' ? 'LOCAÇÃO' : 'VENDA'}`, 105, 35, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Feito por: Sistema TetoCalc   -   Feito em: ${formatDate(new Date(), 'dd/mm/aa')}`, 15, 45);

    let startY = 63;
    let valueProjection;
    let valuePerSquareMeter;

    if(data.data.LevelOfPricingAccuracy.nivel === '4'){
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Imóveis Utilizados para Precificação:', 15, 55);

        const startX = 20;

        doc.setFont(undefined, 'normal');
        doc.text(`Nenhum. Calculo interno de precificação utilizado.`, 15, startY);
        startY += 10;

        valueProjection = formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]] * data.data.targetProperty.usefulArea);
        valuePerSquareMeter = formatValueLocation(data.data.valueProjection[Object.keys(data.data.valueProjection)[0]]);
    }else{
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Imóveis Utilizados para Precificação:', 15, 55);

        const startX = 20;
        const indentX = 10;

        doc.setFont(undefined, 'normal');

        for (let index = 0; index < data.data.propertiesUsedInProjection.length; index++) {
            const property = data.data.propertiesUsedInProjection[index];
            const city = await getCityByNeighborhood(property.neighborhoodId);
            const neighborhood = await getNeighborhoodById(property.neighborhoodId);

            doc.setFontSize(12);

            doc.text(`${index + 1}) ${property.type.toLocaleLowerCase()} ${property.typeStructure.toLocaleLowerCase()} - ${neighborhood.toLocaleLowerCase()}, ${city.toLocaleLowerCase()}`, startX, startY);
            startY += 8;

            doc.text(`${property.dormitories} Quartos, ${property.bathrooms} Banheiros, ${property.suites} Suites e ${property.parkingSpaces} Vagas`, startX + indentX, startY);
            startY += 7;

            doc.text(`a. Valor do imóvel: ${formatValueLocation(property.value)}${property.negotiation === 'LOCACAO' ? '/mês' : ''}`, startX + indentX, startY);
            startY += 7;
            
            doc.text(`b. Metragem: ${formatValueLocation(property.usefulArea)}m²`, startX + indentX, startY);
            startY += 7;

            doc.text(`c. Valor do m²: ${formatValueLocation(property.valuePerSquareMeter)}`, startX + indentX, startY);
            startY += 10;

            valueProjection = formatValueLocation(data.data.projectedValueOfTheProperty);
            valuePerSquareMeter = formatValueLocation(data.data.projectedValueOfTheProperty / data.data.targetProperty.usefulArea);
        }       
    }

    const city = await getCityByNeighborhood(data.data.targetProperty.neighborhoodId);
    const neighborhood = await getNeighborhoodById(data.data.targetProperty.neighborhoodId);

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Imóvel Alvo: ${data.data.targetProperty.type.toLocaleLowerCase()} ${data.data.targetProperty.typeStructure.toLocaleLowerCase()} - ${neighborhood.toLocaleLowerCase()}, ${city.toLocaleLowerCase()}`, 15, startY);
    startY += 7;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    
    const dormitories = data.data.targetProperty.dormitories ? `${data.data.targetProperty.dormitories} Quartos` : '';
    const bathrooms = data.data.targetProperty.bathrooms ? `${data.data.targetProperty.bathrooms} Banheiros` : '';
    const suites = data.data.targetProperty.suites ? `${data.data.targetProperty.suites} Suites` : '';
    const parkingSpaces = data.data.targetProperty.parkingSpaces ? `${data.data.targetProperty.parkingSpaces} Vagas` : '';
    
    const detailsArray = [dormitories, bathrooms, suites, parkingSpaces].filter(Boolean);
    
    let details;
    if (detailsArray.length > 1) {
        const lastDetail = detailsArray.pop();
        details = detailsArray.join(', ') + ' e ' + lastDetail;
    } else {
        details = detailsArray.join(', ');
    }
    
    doc.text(details, 15, startY); 
    startY += 10;

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Projeção do Valor do Metro Quadrado:`, 15, startY); 
    startY += 5;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`${valuePerSquareMeter}`, 15, startY); 
    startY += 10

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Projeção do Valor do Imóvel:`, 15, startY); 
    startY += 5;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`${valueProjection}${data.data.targetProperty.negotiation === 'LOCACAO' ? '/mês' : ''}`, 15, startY); 
    startY += 10

    doc.save('estudo_mercadologico.pdf');
}