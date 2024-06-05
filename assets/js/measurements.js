import { requestAPI } from "./api/request.js";

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

    let path = `/pages/result.html?${params.toString()}&usefulArea=${usefulArea.value}`

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
   
    console.log(window.location.origin + path);

    try {
        console.log(await requestAPI(window.location.origin + path));
    } catch (error) {
        console.log(error);
    }
    
    // window.location.href = window.location.origin + path;
})