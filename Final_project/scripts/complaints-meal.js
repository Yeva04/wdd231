import { showModal } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('meal-complaint-form');
    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        data.timestamp = new Date().toISOString();

        // Save locally (you can also send to server if needed)
        const saved = JSON.parse(localStorage.getItem('mealServiceComplaints') || '[]');
        saved.push(data);
        localStorage.setItem('mealServiceComplaints', JSON.stringify(saved));

        const m = showModal(`<h2>Complaint Submitted</h2><p>Your feedback has been recorded. Thank you!</p>`);
        setTimeout(() => m.remove(), 1800);
        form.reset();
    });
});
