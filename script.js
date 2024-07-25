const events = {
    chile: ["Independence Day: September 18", "New Year's Day: January 1"],
    peru: ["Independence Day: July 28", "Santa Rosa de Lima: August 30"],
    argentina: ["Independence Day: July 9", "Friendship Day: July 20"],
    mexico: ["Independence Day: September 16", "Day of the Dead: November 2"],
    colombia: ["Independence Day: July 20", "Battle of Boyacá: August 7"]
};

function updateClock(id, offset) {
    const now = new Date();
    const localTime = now.getTime();
    const localOffset = now.getTimezoneOffset() * 60000;
    const utc = localTime + localOffset;
    const countryTime = new Date(utc + (3600000 * offset));
    
    const hours = countryTime.getHours().toString().padStart(2, '0');
    const minutes = countryTime.getMinutes().toString().padStart(2, '0');
    const seconds = countryTime.getSeconds().toString().padStart(2, '0');
    const date = countryTime.toLocaleDateString();

    document.getElementById(`${id}-clock`).textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById(`${id}-date`).textContent = date;
    updateEvents(id);
}

function updateEvents(id) {
    const eventsContainer = document.getElementById(`${id}-events`);
    eventsContainer.innerHTML = '';
    events[id].forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.textContent = event;
        eventElement.classList.add('event');
        eventsContainer.appendChild(eventElement);
    });
}

function startClocks() {
    setInterval(() => updateClock('chile', -4), 1000);
    setInterval(() => updateClock('peru', -5), 1000);
    setInterval(() => updateClock('argentina', -3), 1000);
    setInterval(() => updateClock('mexico', -6), 1000);
    setInterval(() => updateClock('colombia', -5), 1000);
}

startClocks();
