// scripts/index.js
import { loadCarousel } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const currentYear = document.getElementById('current-year');
    const currentPage = window.location.pathname.split('/').pop();

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (currentYear) currentYear.textContent = new Date().getFullYear();
    loadCarousel();
});