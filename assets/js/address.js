document.querySelector('.property-information button').addEventListener('click', (e) => {
    e.preventDefault();
    
    const avaibleNeighborhoods = ["JARDIM MONTE ALEGRE", "PARQUE TABOÃO", "JARDIM MARIA ROSA", "CIDADE INTERCAP", "JARDIM FREI GALVÃO", "VILA MAFALDA", "VILA IASI", "JARDIM BOM TEMPO", "JARDIM KUABARA", "CHÁCARA AGRINDUS", "PARQUE PINHEIROS", "JARDIM BEATRIZ", "PARQUE ASSUNÇÃO", "PARQUE MARABÁ", "JARDIM CLEMENTINO", "PARQUE INDUSTRIAL DACI", "JARDIM RECORD", "JARDIM OLIVEIRAS", "JARDIM OURO PRETO", "JARDIM SALETE", "VILA SANTA LUZIA", "JARDIM SAPORITO", "JARDIM HENRIQUETA", "ARRAIAL PAULISTA", "PARQUE ALBINA", "JARDIM LEME", "JARDIM SÃO SALVADOR", "JARDIM WANDA", "PARQUE SÃO JOAQUIM", "JARDIM SÃO PAULO", "JARDIM GUACIARA", "JARDIM IRACEMA", "PARQUE MONTE ALEGRE", "NÚCLEO RESIDENCIAL ISABELA", "CONDOMÍNIO IOLANDA", "JARDIM AMÉRICA", "SÍTIO DAS MADRES", "JARDIM SÃO JUDAS TADEU", "JARDIM MARIA HELENA", "VILA INDIANA", "PARQUE LAGUNA", "JARDIM MIRNA", "JARDIM ELIZABETE", "JARDIM ROBERTO", "JARDIM SUÍNA", "JARDIM MARIA LUIZA", "JARDIM SANTA ROSA", "JARDIM MITUZI", "VILA DAS OLIVEIRAS", "JARDIM HELENA", "JARDIM SANTA CRUZ", "JARDIM SAINT MORITZ", "JARDIM MARGARIDA", "JARDIM TRÊS MARIAS", "JARDIM SANTA CECÍLIA"]
    const avaibleCitys = ["TABOÃO DA SERRA"];

    const inputCity = document.getElementById('first-input');
    const inputNeighborhood = document.getElementById('secont-input');

    if(!avaibleCitys.find(city => city === inputCity.value.toUpperCase())){
        alert('Forneça uma cidade válida!');
        return;
    }

    if(!avaibleNeighborhoods.find(neighborhood => neighborhood === inputNeighborhood.value.toUpperCase())){
        alert('Forneça um bairro válido!');
        return;
    }

    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    const path = `/pages/characteristics.html?${params.toString()}&neighborhoodId=${inputNeighborhood.value.toUpperCase()}`;
    window.location.href = window.location.origin + path;
    
});