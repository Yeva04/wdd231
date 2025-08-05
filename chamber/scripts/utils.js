export async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return response.json();
}

export function displaySnacks(snacks) {
    const snackList = document.getElementById('snack-list');
    snackList.innerHTML = '';
    snacks.forEach(snack => {
        const div = document.createElement('div');
        div.className = 'snack-item';
        div.innerHTML = `
            <img src="images/${snack.image}" alt="${snack.name}" loading="lazy">
            <h3>${snack.name}</h3>
            <p>$${snack.price}</p>
            <button onclick="import('./order.js').then(m => m.addToCart(${JSON.stringify(snack)}))">Add to Cart</button>
        `;
        snackList.appendChild(div);
    });
}

export function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">×</span>
            <p>${content}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
}

export function updateFooter() {
    const currentYear = document.getElementById('current-year');
    if (currentYear) currentYear.textContent = new Date().getFullYear();
}