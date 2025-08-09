// scripts/complaint-action.js
document.addEventListener('DOMContentLoaded', () => {
    const formDataElement = document.getElementById('form-data');
    const complaint = localStorage.getItem('latestComplaint');
    if (complaint) {
        const data = JSON.parse(complaint);
        formDataElement.textContent = `
            Thank you! Your complaint has been submitted.
            Name: ${data.name}
            Email: ${data.email}
            Issue: ${data.issue}
        `;
    } else {
        formDataElement.textContent = 'No complaint data available.';
    }
});