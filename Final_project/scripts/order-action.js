// scripts/order-action.js
import { showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = orders.length > 0 ? orders.length - 1 : null;

    // Populate order details
    document.getElementById('name').textContent = params.get('name') || 'N/A';
    document.getElementById('email').textContent = params.get('email') || 'N/A';
    document.getElementById('items').textContent = params.get('items') || 'N/A';
    document.getElementById('address').textContent = params.get('address') || 'N/A';

    // Show modal with Change and Cancel options
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && orderIndex !== null) {
        showModal(`
            <h3>Order Successfully Placed!</h3>
            <p>Would you like to change or cancel your order?</p>
            <button id="cancel-order">Cancel Order</button>
            <button id="change-order">Change Order</button>
        `, (modalContent) => {
            const modal = modalContent.parentElement;
            // Debug: Log the modal content to confirm structure
            console.log('Modal Content:', modal.innerHTML);

            const cancelButton = modalContent.querySelector('#cancel-order');
            const changeButton = modalContent.querySelector('#change-order');

            cancelButton.addEventListener('click', () => {
                console.log('Cancel button clicked, removing modal');
                modal.remove();
                console.log('Redirecting to complaints.html');
                window.location.href = './complaints.html';
            });

            changeButton.addEventListener('click', () => {
                console.log('Change button clicked, removing modal');
                modal.remove();
                console.log('Redirecting to order.html with editIndex:', orderIndex);
                window.location.href = `./order.html?editIndex=${orderIndex}`;
            });
        }, modalContainer);
    } else {
        console.error('Modal container not found or no orders exist');
    }
});