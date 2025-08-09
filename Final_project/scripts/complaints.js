// scripts/complaints.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('primary-nav');
    const currentYear = document.getElementById('current-year');
    const complaintForm = document.getElementById('complaint-form');

    // Mobile nav toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }

    // Footer year
    if (currentYear) currentYear.textContent = new Date().getFullYear();

    // Form submission
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(complaintForm);
        const complaint = Object.fromEntries(formData);

        console.log("Complaint submitted:", complaint); // simulate saving

        // Show modal success message
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.6)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '9999';

        modal.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; max-width: 300px;">
                <h3>Complaint Submitted!</h3>
                <p>Thank you for your feedback. Redirecting you to the home page...</p>
            </div>
        `;

        document.body.appendChild(modal);

        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    });
});
