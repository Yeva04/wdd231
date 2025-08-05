import { fetchData, displaySnacks, showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const snackList = document.getElementById('snack-list');
    const searchInput = document.getElementById('search');

    try {
        const snacks = await fetchData('./data/snacks.json');
        displaySnacks(snacks);
        localStorage.setItem('cart', JSON.stringify([]));

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filteredSnacks = snacks.filter(snack => snack.name.toLowerCase().includes(query));
            displaySnacks(filteredSnacks);
        });
    } catch (error) {
        console.error('Error fetching snacks:', error);
        snackList.innerHTML = '<p>Error loading snacks. Check data/snacks.json.</p>';
    }

    document.getElementById('menu-toggle').addEventListener('click', () => {
        const nav = document.getElementById('primary-nav');
        nav.classList.toggle('open');
        document.getElementById('menu-toggle').textContent = nav.classList.contains('open') ? 'X' : '☰';
    });
});

export function addToCart(snack) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(snack);
    localStorage.setItem('cart', JSON.stringify(cart));
    showModal(`${snack.name} added to cart!`);
}