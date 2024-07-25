const holidays = {
    chile: {
        0: ["Año Nuevo: 1 de enero"], // Enero
        1: [], // Febrero
        2: [], // Marzo
        3: [], // Abril
        4: [], // Mayo
        5: [], // Junio
        6: [], // Julio
        7: [], // Agosto
        8: ["Día de la Independencia: 18 de septiembre", "Día de las Glorias del Ejército: 19 de septiembre"], // Septiembre
        9: [], // Octubre
        10: [], // Noviembre
        11: ["Navidad: 25 de diciembre"] // Diciembre
    },
    peru: {
        0: ["Año Nuevo: 1 de enero"], // Enero
        1: [], // Febrero
        2: [], // Marzo
        3: [], // Abril
        4: [], // Mayo
        5: [], // Junio
        6: [], // Julio
        7: ["Santa Rosa de Lima: 30 de agosto"], // Agosto
        8: [], // Septiembre
        9: [], // Octubre
        10: [], // Noviembre
        11: ["Navidad: 25 de diciembre"] // Diciembre
    },
    argentina: {
        0: ["Año Nuevo: 1 de enero"], // Enero
        1: [], // Febrero
        2: [], // Marzo
        3: [], // Abril
        4: [], // Mayo
        5: [], // Junio
        6: ["Día de la Independencia: 9 de julio"], // Julio
        7: ["Día del Amigo: 20 de julio"], // Agosto
        8: [], // Septiembre
        9: [], // Octubre
        10: [], // Noviembre
        11: ["Navidad: 25 de diciembre"] // Diciembre
    },
    mexico: {
        0: ["Año Nuevo: 1 de enero"], // Enero
        1: [], // Febrero
        2: [], // Marzo
        3: [], // Abril
        4: [], // Mayo
        5: [], // Junio
        6: [], // Julio
        7: [], // Agosto
        8: ["Día de la Independencia: 16 de septiembre"], // Septiembre
        9: [], // Octubre
        10: ["Día de los Muertos: 2 de noviembre"], // Noviembre
        11: ["Navidad: 25 de diciembre"] // Diciembre
    },
    colombia: {
        0: ["Año Nuevo: 1 de enero"], // Enero
        1: [], // Febrero
        2: [], // Marzo
        3: [], // Abril
        4: [], // Mayo
        5: [], // Junio
        6: [], // Julio
        7: [], // Agosto
        8: [], // Septiembre
        9: [], // Octubre
        10: [], // Noviembre
        11: ["Navidad: 25 de diciembre"] // Diciembre
    }
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
    updateHolidays(id, countryTime.getMonth());
}

function updateHolidays(id, month) {
    const holidaysContainer = document.getElementById(`${id}-events`);
    holidaysContainer.innerHTML = '';
    const countryHolidays = holidays[id][month];
    countryHolidays.forEach(holiday => {
        const holidayElement = document.createElement('div');
        holidayElement.textContent = holiday;
        holidayElement.classList.add('event');
        holidaysContainer.appendChild(holidayElement);
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
