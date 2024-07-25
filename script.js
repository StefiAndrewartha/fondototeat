const apiKey = 'bLKeTX81aMspyA6G1JLiIKLYfYQ6Oz0Z'; // Reemplaza esto con tu clave API de Calendarific
const countries = {
    chile: 'CL',
    peru: 'PE',
    argentina: 'AR',
    mexico: 'MX',
    colombia: 'CO'
};

async function fetchHolidays(countryCode, year, month) {
    const response = await fetch(`https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${countryCode}&year=${year}&month=${month + 1}`);
    const data = await response.json();
    return data.response.holidays;
}

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
    updateHolidays(id, countryTime.getFullYear(), countryTime.getMonth());
}

async function updateHolidays(id, year, month) {
    const holidaysContainer = document.getElementById(`${id}-events`);
    holidaysContainer.innerHTML = '';
    const countryCode = countries[id];
    const holidays = await fetchHolidays(countryCode, year, month);
    holidays.forEach(holiday => {
        const holidayElement = document.createElement('div');
        holidayElement.textContent = `${holiday.name}: ${holiday.date.iso}`;
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

