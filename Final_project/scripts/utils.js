export async function fetchMenu() {
    const response = await fetch('data/menu.json');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export function displayItems(items, container) {
    container.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item-list';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Category: ${item.category}</p>
            <p>Availability: ${item.available ? 'In Stock' : 'Out of Stock'}</p>
            <img src="images/${item.name.toLowerCase().replace(' ', '-')}.jpg" alt="${item.name}" loading="lazy">
        `;
        container.appendChild(div);
    });
}

export function filterItems(items, category) {
    return category === 'all' ? items : items.filter(item => item.category === category);
}

/* ---------- Modal helper ---------- */
export function showModal(content, callback) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" role="dialog" aria-modal="true">
            <button class="close" aria-label="Close">&times;</button>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);

    // Use CSS class to make it visible (so CSS animations can run)
    requestAnimationFrame(() => modal.classList.add('open'));

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    if (callback) {
        setTimeout(() => callback(modal), 0);
    }
    return modal;
}

/* ---------- Robust Carousel (sliding track) ---------- */
export function loadCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) {
        console.warn('No #carousel element found.');
        return;
    }

    const images = [
        'snack1.jpeg',
        'snack2.jpg',
        'snack3.jpeg'
    ];

    carousel.innerHTML = `
        <button id="prev-btn" class="carousel-btn" aria-label="Previous">←</button>
        <div class="carousel-viewport">
            <div class="carousel-track" role="list"></div>
        </div>
        <button id="next-btn" class="carousel-btn" aria-label="Next">→</button>
    `;

    const viewport = carousel.querySelector('.carousel-viewport');
    const track = carousel.querySelector('.carousel-track');

    let loadedCount = 0;
    images.forEach(src => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.setAttribute('role', 'listitem');

        const img = document.createElement('img');
        img.src = `images/${src}`;
        img.alt = 'Snack item';
        img.loading = 'lazy'; // Ensured lazy loading

        img.addEventListener('error', () => {
            console.warn('Carousel image failed to load:', img.src);
            img.src = 'images/placeholder.png';
        });

        img.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === images.length) updateSizes();
        });

        slide.appendChild(img);
        track.appendChild(slide);
    });

    const slides = track.getElementsByClassName('carousel-slide');
    const prevBtn = carousel.querySelector('#prev-btn');
    const nextBtn = carousel.querySelector('#next-btn');

    let currentIndex = 0;
    let intervalId = null;
    let slideWidth = 0;

    function updateSizes() {
        slideWidth = viewport.clientWidth;
        Array.from(slides).forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.width = `${slideWidth}px`;
        });
        track.style.width = `${slideWidth * slides.length}px`;
        moveTo(currentIndex, false);
    }

    function moveTo(index, animate = true) {
        if (slides.length === 0) return;
        currentIndex = ((index % slides.length) + slides.length) % slides.length;
        if (!animate) track.style.transition = 'none';
        else track.style.transition = 'transform 450ms ease';
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', () => moveTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => moveTo(currentIndex + 1));

    function startAutoScroll() {
        stopAutoScroll();
        intervalId = setInterval(() => moveTo(currentIndex + 1), 2000);
    }
    function stopAutoScroll() {
        if (intervalId) clearInterval(intervalId);
    }

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    carousel.addEventListener('focusin', stopAutoScroll);
    carousel.addEventListener('focusout', startAutoScroll);

    window.addEventListener('resize', () => {
        clearTimeout(window._carouselResizeTimer);
        window._carouselResizeTimer = setTimeout(updateSizes, 80);
    });

    setTimeout(() => {
        if (loadedCount < images.length) updateSizes();
    }, 300);

    moveTo(0, false);
    startAutoScroll();
}