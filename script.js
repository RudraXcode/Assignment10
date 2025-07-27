const key = 'c764742307ef4f6174daa905608a0129';

const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temp');
const iconElement = document.querySelector('#icon');


async function getWeatherByCity(cityName) {
    try {
        // Show loading state
        tempElement.textContent = 'Loading...';
        cityElement.textContent = '';
        iconElement.hidden = true;
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric&lang=en`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        updateWeatherDisplay(data);
        
    } catch (error) {
        tempElement.textContent = 'City not found';
        cityElement.textContent = 'Please try again';
        iconElement.hidden = true;
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherDisplay(data) {
    const currentTemp = data.main.temp;
    const cityName = data.name;
    const country = data.sys.country;
    const iconCode = data.weather[0].icon;
    const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    

    tempElement.textContent = `${currentTemp.toFixed(1)}°C`;
    cityElement.textContent = `${cityName}, ${country}`;
    iconElement.src = weatherIconUrl;
    iconElement.hidden = false;
}

function handleSearch() {
    const cityName = searchInput.value.trim();
    
    if (cityName === '') {
        alert('Please enter a city name');
        return;
    }
    
    getWeatherByCity(cityName);
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    handleSearch();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
});

window.addEventListener('load', () => {
    getWeatherByCity('Delhi');
});
