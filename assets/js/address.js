import { configs } from "./config/config.js";

document.querySelector('.property-information button').addEventListener('click', (e) => {
    e.preventDefault();

    const selectedCity = document.getElementById('city').value.toUpperCase();
    const neighborhoodList = document.getElementById('neighborhood');
    const selectedNeighborhood = neighborhoodList.value.toUpperCase();
    const neighborhoodElement = Array.from(neighborhoodList.options).find(option => option.value.toUpperCase() === selectedNeighborhood);

    if(!configs.avaible_citys.find(city => city === selectedCity)){
        alert('Forneça uma cidade válida!');
        return;
    }
    if(!configs.avaible_neighborhoods.find(neighborhood => neighborhood === selectedNeighborhood)){
        alert('Forneça um bairro válido!');
        return;
    }

    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    
    const path = `${configs.domain_suffix}pages/characteristics.html?${params.toString()}&neighborhoodId=${neighborhoodElement.getAttribute('aria-label')}`;
    window.location.href = window.location.origin + path;    
});