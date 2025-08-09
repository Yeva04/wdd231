// scripts/order.js
import { fetchMenu, showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const orderForm = document.getElementById('order-form');
    const itemsSelect = document.getElementById('items');
    const currentYear = document.getElementById('current-year');
    const currentPage = window.location.pathname.split('/').pop();

    if (menuToggle) menuToggle.addEventListener('click', () => nav.classList.toggle('open'));

    const urlParams = new URLSearchParams(window.location.search);
    const editIndexParam = urlParams.has('editIndex') ? parseInt(urlParams.get('editIndex')) : null;
    let editIndex = Number.isInteger(editIndexParam) ? editIndexParam : null;

    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

async function loadMenuOptions() {
    try {
        const items = await fetchMenu();

        const menuContainer = document.querySelector('#menu-display');
        menuContainer.innerHTML = ''; // clear old content
        itemsSelect.innerHTML = ''; // clear dropdown

        items.forEach(item => {
            // Dropdown option
            const option = document.createElement('option');
            option.value = item.name;
            option.textContent = `${item.name} ($${item.price})`;
            itemsSelect.appendChild(option);

            // Menu card with image
            if (menuContainer) {
                const card = document.createElement('div');
                card.classList.add('menu-card');

                const img = document.createElement('img');
                img.src = item.image;
                img.alt = item.name;

                const caption = document.createElement('p');
                caption.textContent = `${item.name} - $${item.price}`;

                card.appendChild(img);
                card.appendChild(caption);
                menuContainer.appendChild(card);
            }
        });

        // Prefill for edit/change order cases
        if (editIndex !== null && orders[editIndex]) {
            prefillForm(orders[editIndex]);
        } else {
            const latest = JSON.parse(localStorage.getItem('latestOrder') || 'null');
            if (latest && !editIndex) prefillForm(latest);
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
        // select items (multiple)
        Array.from(itemsSelect.options).forEach(opt => {
            opt.selected = order.items && order.items.indexOf(opt.value) !== -1;
        });
    }

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(orderForm);
        const order = Object.fromEntries(formData);
        // convert items (multiple select) to array
        const selectedItems = Array.from(itemsSelect.selectedOptions).map(o => o.value);
        order.items = selectedItems;
        order.createdAt = new Date().toISOString();

        if (editIndex !== null) {
            // update existing order
            orders[editIndex] = order;
        } else {
            // add new order
            orders.push(order);
            editIndex = orders.length - 1;
        }

        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('latestOrder', JSON.stringify(order));

        // Show confirmation modal
        showModal(`
            <h2>Order Confirmed!</h2>
            <p>Your order was saved. Would you like to cancel or change this order?</p>
            <button id="cancel-order">Cancel Order</button>
            <button id="change-order">Change Order</button>
        `, (modal) => {
            const cancelBtn = modal.querySelector('#cancel-order');
            const changeBtn = modal.querySelector('#change-order');

            // CANCEL -> send user to complaints page and set cancelIndex
            cancelBtn.addEventListener('click', () => {
                modal.remove();
                localStorage.setItem('cancelOrderIndex', String(editIndex));
                // redirect and pass index in query to prefill complaint form
                window.location.href = `complaints.html?cancelIndex=${editIndex}`;
            });

            // CHANGE -> open order page prefilled for editing this exact order
            changeBtn.addEventListener('click', () => {
                modal.remove();
                // redirect to order page with editIndex to prefill
                window.location.href = `order.html?editIndex=${editIndex}`;
            });
        });

        orderForm.reset();
        // clear editIndex after submission: keep it only for the redirect target
        editIndex = null;
    });

    // set current year
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    // highlight nav
    nav.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    loadMenuOptions();
});
