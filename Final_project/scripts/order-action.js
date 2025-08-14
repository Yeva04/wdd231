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

    // Show modal below order details as a success popup
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer && orderIndex !== null) {
        showModal(`
            <h3>Order Successfully Placed!</h3>
            <p>Your order has been received. Thank you!</p>
        `, (modalContent) => {
            const modal = modalContent.parentElement;
            modalContainer.appendChild(modal);

            // Optional: Auto-close after 3 seconds
            setTimeout(() => modal.remove(), 3000);
        });
    } else {
        console.error('Modal container not found or no orders exist');
    }
});