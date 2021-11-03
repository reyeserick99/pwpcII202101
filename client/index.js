/* eslint-disable prettier/prettier */
import './stylesheets/style.css';
import './stylesheets/mystyles.css';

// Inicializando Svrip de Materialize
document.addEventListener('DOMContentLoaded', () => {
    const sideNav = document.querySelectorAll('.sidenav');
    // eslint-disable-next-line no-undef
    M.Sidenav.init(sideNav);
});