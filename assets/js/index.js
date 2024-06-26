import { configs } from "./config/config.js";

document.querySelector('.submit').addEventListener('click', (e)=>{
    e.preventDefault();

    const propertyTypeRole = ['SOBRADO', 'APARTAMENTO', 'CASA TÉRREA', 'CASA PADRÃO'];
    const propertyIntentionRole = ['VENDA', 'LOCAÇÃO'];
    const propertyCategoryRole = ['RESIDENCIAL', 'COMERCIAL'];

    let propertyType = document.getElementById('property-type');
    let propertyIntention = document.getElementById('intention'); 
    let propertyCategory = document.getElementById('category');
 
    if(propertyType.value === '#') propertyType.value = '';
    if(propertyIntention.value === '#') propertyIntention.value = '';
    if(propertyCategory.value === '#') propertyCategory.value = '';

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
        case 'RESIDENCIAL':
            propertyCategory = 'RESIDENCIAL'
            break
        case 'COMERCIAL':
            propertyCategory = 'COMERCIAL'
            break
    }

    const path = `${configs.domain_suffix}pages/address.html?status=ATIVO&type=${propertyType}&negotiation=${propertyIntention}&typeStructure=${propertyCategory}`;
    window.location.href = window.location.origin + path;
});