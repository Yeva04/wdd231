document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded for members script');

    // Fallback data to ensure display
    let membersData = [
        { name: 'Fallback Business 1', image: 'default.jpg', address: 'Addr 1', phone: '123', website: 'http://example.com', membership: 1, other: 'Info 1' },
        { name: 'Fallback Business 2', image: 'default.jpg', address: 'Addr 2', phone: '456', website: 'http://example2.com', membership: 2, other: 'Info 2' }
    ];

    async function fetchMembers() {
        try {
            const response = await fetch('/chamber/data/members.json');
            if (!response.ok) throw new Error('Network response was not ok');
            membersData = await response.json();
            console.log('Members fetched:', membersData.length, 'items');
            localStorage.setItem('members', JSON.stringify(membersData));
        } catch (error) {
            console.error('Error fetching members:', error);
            console.log('Using fallback members:', membersData.length, 'items');
        } finally {
            displayMembers(membersData, document.querySelector('input[name="view-option"]:checked').value === 'grid');
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
        console.log('Setting layout to:', isGrid ? 'grid' : 'list');

        if (members && members.length > 0) {
            members.forEach(member => {
                const card = document.createElement('div');
                card.classList.add('business-card');
                card.innerHTML = `
                    <h3>${member.name || 'No Name'}</h3>
                    ${isGrid ? `<img src="/chamber/images/${member.image || 'default.jpg'}" alt="${member.name || 'Member'} Logo" class="member-image" onerror="this.src='/chamber/images/default.jpg';">` : ''}
                    <div class="details">
                        <p>Address: ${member.address || 'N/A'}</p>
                        <p>Phone: ${member.phone || 'N/A'}</p>
                        <a href="${member.website || '#'}" target="_blank">${member.website || 'N/A'}</a>
                        <p>Membership: ${member.membership ? (member.membership === 1 ? 'Member' : member.membership === 2 ? 'Silver' : 'Gold') : 'N/A'}</p>
                        <p>${member.other || 'N/A'}</p>
                    </div>
                `;
                directory.appendChild(card);
            });
            console.log('Displayed', members.length, 'members');
        } else {
            directory.innerHTML = '<p>No members data available.</p>';
        }
    }

    // Hamburger toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            menuToggle.textContent = isOpen ? '☰' : 'X';
            console.log('Hamburger clicked, menu', isOpen ? 'closed' : 'opened');
        });
    } else {
        console.error('Menu toggle or nav menu element not found');
    }

    // View switcher using radio buttons
    const viewOptions = document.querySelectorAll('input[name="view-option"]');
    viewOptions.forEach(option => {
        option.addEventListener('change', () => {
            console.log('View option changed to:', option.value);
            displayMembers(membersData, option.value === 'grid');
        });
    });

    // Initialize
    function updateFooter() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
        document.getElementById('last-modified').textContent = document.lastModified;
    }

    window.onload = async () => {
        console.log('Window loaded, initializing');
        updateFooter();
        await fetchMembers();
    };
});