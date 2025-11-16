document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const searchBar = document.getElementById('search-bar');
    let talks = [];

    fetch('talks.json')
        .then(response => response.json())
        .then(data => {
            talks = data;
            renderSchedule(talks);
        });

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTalks = talks.filter(talk => 
            talk.category.some(category => category.toLowerCase().includes(searchTerm))
        );
        renderSchedule(filteredTalks);
    });

    function renderSchedule(talksToRender) {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date();
        currentTime.setHours(10, 0, 0, 0);

        talksToRender.forEach((talk, index) => {
            const talkElement = document.createElement('div');
            talkElement.classList.add('talk');

            const time = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
            currentTime.setMinutes(currentTime.getMinutes() + 60);
            const endTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;

            talkElement.innerHTML = `
                <h3>${time} - ${endTime}</h3>
                <h2>${talk.title}</h2>
                <p class="speakers">By: ${talk.speakers.join(', ')}</p>
                <p class="category">Category: ${talk.category.join(', ')}</p>
                <p class="description">${talk.description}</p>
            `;
            scheduleContainer.appendChild(talkElement);

            if (index === 2) {
                const lunchBreak = document.createElement('div');
                lunchBreak.classList.add('break');
                lunchBreak.textContent = '1:00 PM - 2:00 PM: Lunch Break';
                scheduleContainer.appendChild(lunchBreak);
                currentTime.setMinutes(currentTime.getMinutes() + 60);
            } else if (index < talksToRender.length - 1) {
                const coffeeBreak = document.createElement('div');
                coffeeBreak.classList.add('break');
                const breakStartTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
                currentTime.setMinutes(currentTime.getMinutes() + 10);
                const breakEndTime = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
                coffeeBreak.textContent = `${breakStartTime} - ${breakEndTime}: Coffee Break`;
                scheduleContainer.appendChild(coffeeBreak);
            }
        });
    }
});