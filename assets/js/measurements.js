import { configs } from "./config/config.js";

document.querySelector('.property-information button').addEventListener('click', async (e)=>{
    e.preventDefault();
    
    const usefulArea = document.getElementById('first-input');
    const builtArea = document.getElementById('second-input');
    const landArea = document.getElementById('third-input');

    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    if(parseInt(usefulArea.value) < 10 || usefulArea.value === ''){
        alert(`O campo ${usefulArea.name.toUpperCase()} é obrigatória e precisa ser maior ou igual a 10`);
        return;
    }

    let path = `${configs.domain_suffix}pages/result.html?${params.toString()}&usefulArea=${usefulArea.value}`

    if(parseFloat(builtArea.value) < 10){
        alert(`O campo ${builtArea.name.toUpperCase()} precisa ser maior ou igual a 10`);
        return;
    }

    if(parseFloat(landArea.value) < 10){
        alert(`O campo ${landArea.name.toUpperCase()} precisa ser maior ou igual a 10`);
        return;
    }

    if (!isNaN(parseFloat(builtArea.value))) {
        path += `&buildingArea=${builtArea.value}`;
    }
    if (!isNaN(parseFloat(landArea.value))) {
        path += `&landArea=${landArea.value}`;
    }
    
    window.location.href = window.location.origin + path;
})

document.querySelectorAll('form label span').forEach(element => {
    element.addEventListener('click', (e)=>{
        const overlay = document.querySelector('.overlay');
        const content = e.target.getAttribute('aria-label');
        const helpPopUp = document.querySelector('.help-pop-up');

        const defination = content.split('/split')[0];
        const exclusions = content.split('/split')[1];

        document.querySelector('.close-button').addEventListener('click', ()=>{
            overlay.style.display = 'none';
            helpPopUp.style.display = 'none';
        })

        helpPopUp.querySelectorAll('p')[0].innerText=defination;
        helpPopUp.querySelectorAll('p')[1].innerText=exclusions;

        helpPopUp.style.display = 'flex';
        overlay.style.display = 'flex';
    })
})