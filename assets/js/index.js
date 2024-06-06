import { configs } from "./config/config.js";

document.querySelector('.property-information button').addEventListener('click', (e)=>{
    e.preventDefault();

    const propertyTypeRole = ['SOBRADO', 'APARTAMENTO', 'CASA TÉRREA', 'CASA PADRÃO'];
    const propertyIntentionRole = ['VENDA', 'LOCAÇÃO'];
    const propertyCategoryRole = ['RESIDÊNCIAL', 'COMERCIAL'];

    let propertyType = document.getElementById('first-input');
    let propertyIntention = document.getElementById('second-input'); 
    let propertyCategory = document.getElementById('third-input');
 
    if(!propertyTypeRole.find((type) => type === propertyType.value.toUpperCase())){
        alert(`O campo ${propertyType.name.toUpperCase()} é obrigatório e precisa ser um dos seguintes: ${propertyTypeRole.join(', ')}`);
        return
    }

    if(!propertyIntentionRole.find((intention) => intention === propertyIntention.value.toUpperCase())){
        alert(`O campo ${propertyIntention.name.toUpperCase()} é obrigatório e precisa ser um dos seguintes: ${propertyIntentionRole.join(', ')}`);
        return
    }

    if(!propertyCategoryRole.find((category) => category === propertyCategory.value.toUpperCase())){
        alert(`O campo ${propertyCategory.name.toUpperCase()} é obrigatório e precisa ser um dos seguintes: ${propertyCategoryRole.join(', ')}`);
        return
    }

    switch(propertyType.value.toUpperCase()){
        case 'CASA TÉRREA':
            propertyType = 'CASA_TERREA'
            break
        case 'CASA PADRÃO':
            propertyType = 'CASA_PADRAO'
            break
        case 'SOBRADO':
            propertyType = 'SOBRADO'
            break
        case 'APARTAMENTO':
            propertyType = 'APARTAMENTO'
            break
    }

    switch(propertyIntention.value.toUpperCase()){
        case 'VENDA':
            propertyIntention = 'VENDA'
            break
        case 'LOCAÇÃO':
            propertyIntention = 'LOCACAO'
            break
    }

    switch(propertyCategory.value.toUpperCase()){
        case 'RESIDÊNCIAL':
            propertyCategory = 'RESIDENCIAL'
            break
        case 'COMERCIAL':
            propertyCategory = 'COMERCIAL'
            break
    }

    const path = `${configs.domainSuffix}pages/address.html?status=ATIVO&type=${propertyType}&negotiation=${propertyIntention}&typeStructure=${propertyCategory}`;
    window.location.href = window.location.origin + path;
});