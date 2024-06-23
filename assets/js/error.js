document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMessage = urlParams.get('errorMessage');
    
    if (errorMessage) {
        document.querySelector('.error').innerHTML = errorMessage;
    }
});
