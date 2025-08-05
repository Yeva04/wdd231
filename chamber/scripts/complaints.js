import { showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('complaint-form');
    const statusBtn = document.getElementById('status-modal-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        localStorage.setItem('complaint', JSON.stringify(Object.fromEntries(formData)));
        form.reset();
        showModal('Complaint submitted! Check status below.');
    });

    statusBtn.addEventListener('click', () => {
        const complaint = JSON.parse(localStorage.getItem('complaint') || '{}');
        showModal(`Status: ${complaint.issue ? 'Pending' : 'No complaint recorded'}`);
    });

    document.getElementById('menu-toggle').addEventListener('click', () => {
        const nav = document.getElementById('primary-nav');
        nav.classList.toggle('open');
        document.getElementById('menu-toggle').textContent = nav.classList.contains('open') ? 'X' : '☰';
    });
});