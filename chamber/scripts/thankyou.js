document.addEventListener('DOMContentLoaded', () => {
    // Footer updates
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Debug and display form data
    console.log('Full URL:', window.location.href);
    console.log('Query String:', window.location.search);
    const params = new URLSearchParams(window.location.search);
    console.log('Raw Params:', Object.fromEntries(params));

    // Fallback to document.referrer if params are empty
    let data = {
        firstName: params.get('fname') || (document.referrer.includes('join.html') ? 'Not submitted' : 'Not provided'),
        lastName: params.get('lname') || (document.referrer.includes('join.html') ? 'Not submitted' : 'Not provided'),
        email: params.get('email') || (document.referrer.includes('join.html') ? 'Not submitted' : 'Not provided'),
        phone: params.get('phone') || (document.referrer.includes('join.html') ? 'Not submitted' : 'Not provided'),
        businessName: params.get('orgname') || (document.referrer.includes('join.html') ? 'Not submitted' : 'Not provided'),
        timestamp: params.get('timestamp') || new Date().toISOString()
    };
    console.log('Processed Data:', data);

    const confirmation = document.getElementById('confirmation');
    if (confirmation) {
        confirmation.innerHTML = `
          <div class="business-card">
            <div class="details">
              <p><strong>First Name:</strong> ${data.firstName}</p>
              <p><strong>Last Name:</strong> ${data.lastName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Mobile Number:</strong> ${data.phone}</p>
              <p><strong>Business Name:</strong> ${data.businessName}</p>
              <p><strong>Submitted On:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
            </div>
          </div>
        `;
    } else {
        console.error('Confirmation section not found');
    }
});