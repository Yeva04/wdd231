// scripts/order.js
import { fetchMenu, showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const orderForm = document.getElementById('order-form');
    const itemsSelect = document.getElementById('items');
    const currentYear = document.getElementById('current-year');
    const currentPage = window.location.pathname.split('/').pop();

    if (menuToggle) {
        menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editIndexParam = urlParams.has('editIndex') ? parseInt(urlParams.get('editIndex')) : null;
    let editIndex = Number.isInteger(editIndexParam) ? editIndexParam : null;

    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

    async function loadMenuOptions() {
      //here
        try {
            const items = await fetchMenu();
            itemsSelect.innerHTML = ''; // clear dropdown

            items.forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                option.textContent = `${item.name} ($${item.price.toFixed(2)})`;
                itemsSelect.appendChild(option);
            });

            // Prefill if editing or latest order exists
            if (editIndex !== null && orders[editIndex]) {
                prefillForm(orders[editIndex]);
            } else {
                const latest = JSON.parse(localStorage.getItem('latestOrder') || 'null');
                if (latest && !editIndex) prefillForm(latest);
            }
            //here
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
        Array.from(itemsSelect.options).forEach(opt => {
            opt.selected = order.items && order.items.indexOf(opt.value) !== -1;
        });
    }

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(orderForm);
        const order = Object.fromEntries(formData);
        order.items = Array.from(itemsSelect.selectedOptions).map(o => o.value);
        order.createdAt = new Date().toISOString();

        if (editIndex !== null) {
            orders[editIndex] = order;
        } else {
            orders.push(order);
            editIndex = orders.length - 1;
        }

        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('latestOrder', JSON.stringify(order));

        showModal(`
            <h2>Order Confirmed!</h2>
            <p>Your order was saved. Would you like to cancel or change this order?</p>
            <button id="cancel-order">Cancel Order</button>
            <button id="change-order">Change Order</button>
        `, (modal) => {
            modal.querySelector('#cancel-order').addEventListener('click', () => {
                modal.remove();
                localStorage.setItem('cancelOrderIndex', String(editIndex));
                window.location.href = `complaints.html?cancelIndex=${editIndex}`;
            });

            modal.querySelector('#change-order').addEventListener('click', () => {
                modal.remove();
                window.location.href = `order.html?editIndex=${editIndex}`;
            });
        });

        orderForm.reset();
        editIndex = null;
    });

    if (currentYear) currentYear.textContent = new Date().getFullYear();

    nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    loadMenuOptions();
});
