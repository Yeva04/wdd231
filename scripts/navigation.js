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

document.addEventListener('DOMContentLoaded', () => {
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    } else {
        console.log("closeMenu element not found");
    }
});