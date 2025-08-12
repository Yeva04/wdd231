// scripts/menu.js
import { fetchMenu, filterItems } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const searchInput = document.getElementById('search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const itemList = document.getElementById('item-list');
    const currentYear = document.getElementById('current-year');
    const currentPage = window.location.pathname.split('/').pop();

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    function displayItemsWithImages(items) {
        itemList.innerHTML = '';
        if (items.length === 0) {
            itemList.innerHTML = '<p>No items found.</p>';
            return;
        }
        items.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('menu-card');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.loading = 'lazy'; // Added lazy loading

            const title = document.createElement('h3');
            title.textContent = item.name;

            const price = document.createElement('p');
            price.textContent = `$${item.price}`;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(price);

            itemList.appendChild(card);
        });
    }

    async function loadMenu() {
        try {
            const items = await fetchMenu();
            displayItemsWithImages(items);

            categoryButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.getAttribute('data-category');
                    const filtered = filterItems(items, category);
                    displayItemsWithImages(filtered);
                });
            });

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filtered = items.filter(item =>
                    item.name.toLowerCase().includes(query)
                );
                displayItemsWithImages(filtered);
            });
        } catch (error) {
            console.error('Error loading menu:', error);
            itemList.innerHTML = '<p>Failed to load menu. Please try again later.</p>';
        }
    }

    nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (currentYear) currentYear.textContent = new Date().getFullYear();
    loadMenu();
});