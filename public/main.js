'use strict'

document.addEventListener('DOMContentLoaded', (event) => {
    const btnLogin = document.getElementById('login');
    const divModal = document.getElementById('modal');
    const btnClose = document.getElementsByTagName('button')[0];

    // Si no exiiste el modal lo crea.
    btnLogin.addEventListener('click', (event) => {
        event.preventDefault();
        // Muestra o oculta el modal.
        if (modal.classList.contains('hidden')) {
            divModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '17px';
            document.getElementsByTagName('header')[0].style.paddingRight = '57px';
        } else {
            divModal.classList.add('hidden')
            document.body.style.overflow = 'auto';
            document.body.style.paddingRight = '0px';
            document.getElementsByTagName('header')[0].style.paddingRight = '40px';
        }
    })

    btnClose.addEventListener('click', (event) => {
        event.preventDefault();
        divModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0px';
        document.getElementsByTagName('header')[0].style.paddingRight = '40px';
    })
});

window.toggleDarkTheme = () => {
    const themeIcon = document.getElementById('themeIcon');
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    themeIcon.innerHTML = `<svg onclick="toggleLightTheme()" xmlns="http://www.w3.org/2000/svg" class="mx-10 icon icon-tabler icon-tabler-shadow" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/><path d="M13 12h5"/><path d="M13 15h4"/><path d="M13 18h1"/><path d="M13 9h4"/><path d="M13 6h1"/></svg>`;
}

window.toggleLightTheme = () => {
    const themeIcon = document.getElementById('themeIcon');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = `<svg onclick="toggleDarkTheme()" xmlns="http://www.w3.org/2000/svg" class="mx-10 icon icon-tabler icon-tabler-brightness-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3v5m0 4v9"/><path d="M5.641 5.631a9 9 0 1 0 12.719 12.738m1.68 -2.318a9 9 0 0 0 -12.074 -12.098"/><path d="M12.5 8.5l4.15 -4.15"/><path d="M12 14l1.025 -.983m2.065 -1.981l4.28 -4.106"/><path d="M12 19.6l3.79 -3.79m2 -2l3.054 -3.054"/><path d="M3 3l18 18"/></svg>`;
}
