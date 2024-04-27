// Códigos ligados a páginas especificas

import {DispatchAlert} from "./components/DispatchAlert.js";

window.addEventListener('load', ()=>{
    new DispatchAlert('confirm', 'Para remover este ALERT acesse: \nassets/js/index.js'); // Exemplo de chamada
})