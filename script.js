const events = {
    chile: ["Día de la Independencia: 18 de septiembre", "Año Nuevo: 1 de enero"],
    peru: ["Día de la Independencia: 28 de julio", "Santa Rosa de Lima: 30 de agosto"],
    argentina: ["Día de la Independencia: 9 de julio", "Día del Amigo: 20 de julio"],
    mexico: ["Día de la Independencia: 16 de septiembre", "Día de los Muertos: 2 de noviembre"],
    colombia: ["Día de la Independencia: 20 de julio", "Batalla de Boyacá: 7 de agosto"]
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

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Intl.DateTimeFormat('es-ES', options).format(countryTime);

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
