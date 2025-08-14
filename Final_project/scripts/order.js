// scripts/order.js
import { fetchMenu } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const orderForm = document.getElementById('order-form');
    const itemsSelect = document.getElementById('items');
    const currentYear = document.getElementById('current-year');
    const currentPage = window.location.pathname.split('/').pop();

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.has('editIndex') ? parseInt(urlParams.get('editIndex')) : null;

    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

    async function loadMenuOptions() {
        try {
            const items = await fetchMenu();
            itemsSelect.innerHTML = ''; // Clear dropdown
            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = `${item.name} ($${item.price.toFixed(2)})`;
                itemsSelect.appendChild(option);
            });
            if (editIndex !== null && orders[editIndex]) {
                prefillForm(orders[editIndex]);
            }
        } catch (error) {
            console.error('Error loading menu options:', error);
            itemsSelect.innerHTML = '<option value="">Error loading meals</option>';
        }
    }

    function prefillForm(order) {
        if (!order) return;
        orderForm.querySelector('#name').value = order.name || '';
        orderForm.querySelector('#email').value = order.email || '';
        orderForm.querySelector('#address').value = order.address || '';
        const selectedItems = order.items ? order.items.split(', ') : [];
        Array.from(itemsSelect.options).forEach(opt => {
            opt.selected = selectedItems.includes(opt.value);
        });
    }

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(orderForm);
        const order = {
            name: formData.get('name'),
            email: formData.get('email'),
            items: Array.from(formData.getAll('items')).join(', '),
            address: formData.get('address')
        };

        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        if (editIndex !== null) {
            orders[editIndex] = order;
        } else {
            orders.push(order);
        }
        localStorage.setItem('orders', JSON.stringify(orders));

        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(order)) {
            params.append(key, value);
        }
        window.location.href = `order-action.html?${params.toString()}`;
    });

    nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    if (currentYear) currentYear.textContent = new Date().getFullYear();
    loadMenuOptions();
});