document.addEventListener('DOMContentLoaded', () => {
    const formData = JSON.parse(localStorage.getItem('complaint') || '{}');
    const dataElement = document.getElementById('form-data');
    if (dataElement) {
        dataElement.textContent = `Thank you, ${formData.name}! Your complaint: ${formData.issue} (Email: ${formData.email})`;
    }
});