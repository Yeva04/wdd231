document.addEventListener('DOMContentLoaded', () => {
  // Fetch and display discover cards
  fetch('./data/discover.json')
    .then(response => response.json())
    .then(data => {
      const grid = document.querySelector('.discover-grid');
      data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        card.style.gridArea = `card${index + 1}`;
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name}" loading="lazy"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading discover data:', error));

  // Visit Message Logic
  const visitInfo = document.getElementById('visit-info');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();
  let message;

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDiff = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysDiff < 1) {
      message = "Back so soon! Awesome!";
    } else {
      message = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
    }
  }
  visitInfo.textContent = message;
  localStorage.setItem('lastVisit', currentDate);
});