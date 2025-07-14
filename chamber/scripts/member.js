document.addEventListener('DOMContentLoaded', () => {
    async function fetchMembers() {
        try {
            const response = await fetch('/chamber/data/members.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const members = await response.json();
            console.log('Members fetched:', members);
            displayMembers(members, true);
            document.getElementById('view-toggle').style.display = 'block';
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    function displayMembers(members, isGrid) {
        const directory = document.getElementById('business-directory');
        if (!directory) {
            console.error('Business directory element not found');
            return;
        }
        directory.innerHTML = '';
        directory.className = 'business-directory ' + (isGrid ? 'grid' : 'list');

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card');
            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="/chamber/images/${member.image}" alt="${member.name} Logo" class="member-image">
                <div class="details">
                    <p>Address: ${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>Membership: ${member.membership === 1 ? 'Member' : member.membership === 2 ? 'Silver' : 'Gold'}</p>
                    <p>${member.other}</p>
                </div>
            `;
            directory.appendChild(card);
        });
    }

    // Hamburger and close menu toggle
    const hamburger = document.querySelector('.hamburger');
    const closeMenu = document.querySelector('.close-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.add('active');
        console.log('Hamburger clicked, menu opened');
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
        console.log('Close clicked, menu closed');
    });

    document.getElementById('view-toggle').addEventListener('click', () => {
        const directory = document.getElementById('business-directory');
        const isGrid = directory.classList.contains('grid');
        document.getElementById('view-toggle').textContent = isGrid ? 'Switch to Grid View' : 'Switch to List View';
        displayMembers(JSON.parse(localStorage.getItem('members') || '[]'), !isGrid);
    });

    function updateFooter() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.getElementById('last-modified').textContent = document.lastModified;
    }

    window.onload = async () => {
        updateFooter();
        await fetchMembers();
        const members = await (await fetch('/chamber/data/members.json')).json();
        localStorage.setItem('members', JSON.stringify(members));
    };
});