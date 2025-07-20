document.addEventListener('DOMContentLoaded', () => {
    let membersData = [];

    async function fetchMembers() {
        try {
            const response = await fetch('./data/members.json'); // ✅ Relative path
            if (!response.ok) throw new Error('Network response was not ok');
            membersData = await response.json();
            localStorage.setItem('members', JSON.stringify(membersData));
        } catch (error) {
            console.error('Error fetching members:', error);
            membersData = [];
        } finally {
            displayMembers(membersData, document.querySelector('input[name="view-option"]:checked')?.value === 'grid');
        }
    }

    function displayMembers(members, isGrid) {
        const directory = document.getElementById('business-directory');
        if (!directory) return;

        directory.innerHTML = '';
        directory.className = 'business-directory ' + (isGrid ? 'grid' : 'list');

        if (members.length === 0) {
            directory.innerHTML = '<p>No members data available.</p>';
            return;
        }

        members.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('business-card');
            card.innerHTML = `
                <h3>${member.name}</h3>
                ${isGrid ? `<img src="images/${member.image}" alt="${member.name} Logo" onerror="this.src='images/default.jpg';">` : ''}
                <div class="details">
                    <p>Address: ${member.address}</p>
                    <p>Phone: ${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>Membership: ${member.membership === 3 ? 'Gold' : member.membership === 2 ? 'Silver' : 'Member'}</p>
                    <p>${member.other}</p>
                </div>
            `;
            directory.appendChild(card);
        });
    }

    // View toggle
    document.querySelectorAll('input[name="view-option"]').forEach(option => {
        option.addEventListener('change', () => {
            displayMembers(membersData, option.value === 'grid');
        });
    });

    // Hamburger menu
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    menuToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        menuToggle.textContent = navMenu.classList.contains('active') ? 'X' : '☰';
    });

    // Footer year and modified
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Load members
    fetchMembers();
});
