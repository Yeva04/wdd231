console.log('Weather script loaded at:', new Date().toString());

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Weather DOM fully loaded');

    async function fetchWeather() {
        console.log('Fetching weather...');
        try {
            const currentDate = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const dayIndex = currentDate.getDay();
            const monthIndex = currentDate.getMonth();
            const day = currentDate.getDate();
            const year = currentDate.getFullYear();
            const hours = currentDate.getUTCHours() + 1; // WAT is UTC+1

            const currentWeather = hours >= 6 && hours < 18 ? 'Partly Cloudy, 29°C' : 'Clear, 25°C';
            const currentWeatherElement = document.getElementById('current-weather');
            if (currentWeatherElement) {
                currentWeatherElement.textContent = `Asaba (6.2°N, 6.73°E) - ${currentWeather} at ${hours}:45 WAT`;
                console.log('Current weather set:', currentWeatherElement.textContent);
            } else {
                console.error('Current weather element not found');
            }

            const nextDayIndex = (dayIndex + 1) % 7;
            const nextDay = days[nextDayIndex];
            const nextDayDate = new Date(currentDate);
            nextDayDate.setDate(day + 1);
            const nextMonthIndex = nextDayDate.getMonth();
            const nextDayNum = nextDayDate.getDate();
            const nextYear = nextDayDate.getFullYear();
            const forecast = `${nextDay}, ${nextDayNum} ${months[nextMonthIndex]} ${nextYear}: ${currentWeather}`;
            const forecastElement = document.getElementById('weather-forecast');
            if (forecastElement) {
                forecastElement.innerHTML = `<p>${forecast}</p>`;
                console.log('Forecast set:', forecast);
            } else {
                console.error('Weather forecast element not found');
            }

            setTimeout(fetchWeather, 86400000); // Refresh every 24 hours
        } catch (error) {
            console.error('Error in fetchWeather:', error);
            const currentWeatherElement = document.getElementById('current-weather');
            const forecastElement = document.getElementById('weather-forecast');
            if (currentWeatherElement) currentWeatherElement.textContent = 'Error loading weather';
            if (forecastElement) forecastElement.textContent = 'Error loading forecast';
        }
    }
    await fetchWeather();
});