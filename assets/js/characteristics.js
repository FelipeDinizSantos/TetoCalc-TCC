import { configs } from "./config/config.js";

document.querySelector('.property-information button').addEventListener('click', (e)=>{
    e.preventDefault();
    
    let bedrooms = document.getElementById('first-input');
    let suites = document.getElementById('second-input');
    let parkingSpaces = document.getElementById('fourth-input');
    let bathrooms = document.getElementById('third-input');

    if(parseInt(bedrooms.value) < 0 || parseInt(bedrooms.value) > 50 || bedrooms.value === ''){
        alert(`O campo ${bedrooms.name.toUpperCase()} precisa estar entre 0 e 50`);
        return;
    }

    if(parseInt(bathrooms.value) < 0 || parseInt(bathrooms.value) > 50 || bathrooms.value === ''){
        alert(`O campo ${bathrooms.name.toUpperCase()} precisa estar entre 0 e 50`);
        return;
    }

    if(parseInt(suites.value) < 0 || parseInt(suites.value) > 50){
        alert(`O campo ${suites.name.toUpperCase()} precisa estar entre 0 e 50`);
        return;
    }

    if(parseInt(parkingSpaces.value) < 0 || parseInt(parkingSpaces.value) > 50){
        alert(`O campo ${parkingSpaces.name.toUpperCase()} precisa estar entre 0 e 50`);
        return;
    }

    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    let path = `${configs.domainSuffix}pages/measurements.html?${params.toString()}&bathrooms=${bathrooms.value}&dormitories=${bedrooms.value}`;

    if(!/^ *$/.test(suites.value)) path += `&suites=${suites.value}`;
    if(!/^ *$/.test(parkingSpaces.value)) path += `&parkingSpaces=${parkingSpaces.value}`; 

    window.location.href = window.location.origin + path;
})