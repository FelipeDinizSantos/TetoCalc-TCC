document.querySelector('.back').addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
});

document.querySelector('.register').addEventListener('click', (e) => {
    e.preventDefault();
    history.go(-2);
});