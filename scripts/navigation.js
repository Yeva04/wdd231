const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const closeMenu = document.querySelector('.close-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        navMenu.classList.remove('active');
    }
});

// Ensure closeMenu exists before adding event listener
document.addEventListener('DOMContentLoaded', () => {
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }
});