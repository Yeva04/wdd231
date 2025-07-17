document.addEventListener('DOMContentLoaded', () => {
    fetch('data/members.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const members = data.filter(m =>
                m.membership === 2 || m.membership === 3
            );
            const spotlights = document.getElementById('spotlights');

            if (!spotlights) {
                console.error('No element with id="spotlights" found.');
                return;
            }

            const shuffled = members.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

               function getMembershipLabel(level) {
                switch (level) {
                    case 1: return "Bronze";
                    case 2: return "Silver";
                    case 3: return "Gold";
                    default: return "Unknown";
                }
            }

              selected.forEach(member => {
                const card = document.createElement('div');
                card.className = 'spotlight-card';
                card.innerHTML = `
                    <img src="./images/${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p><strong>${getMembershipLabel(member.membership)} Member</strong></p>
                `;
                spotlights.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error loading spotlight members:', error);
            const spotlights = document.getElementById('spotlights');
            if (spotlights) {
                spotlights.innerHTML = '<p>Error loading member spotlights.</p>';
            }
        });
});
