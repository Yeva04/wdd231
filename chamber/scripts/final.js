import { updateFooter } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    updateFooter();

    const carousel = document.getElementById('carousel');
    const images = [
        { src: 'images/homepage2.jpg', alt: 'Snack On Welcome' },
        { src: 'images/tablefull5.jpg', alt: 'Delicious Meal' },
        { src: 'images/eatVeggie.jpg', alt: 'Healthy Snacks' }
    ];

    images.forEach(img => {
        const div = document.createElement('div');
        div.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy" style="width: 300px;">`;
        carousel.appendChild(div);
    });

    document.getElementById('menu-toggle').addEventListener('click', () => {
        const nav = document.getElementById('primary-nav');
        nav.classList.toggle('open');
        document.getElementById('menu-toggle').textContent = nav.classList.contains('open') ? 'X' : '☰';
    });
});