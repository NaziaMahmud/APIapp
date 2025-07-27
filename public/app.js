
async function showForecast(borough) {
  try {
    const sections = document.querySelectorAll('.forecast-section');
    sections.forEach(section => {
      section.classList.remove('active');
    });

    const selectedSection = document.getElementById(borough);
    selectedSection.classList.add('active');

    const response = await fetch(`/${borough}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const weatherData = await response.json();
    
    displayWeatherData(borough, weatherData);
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById(borough).innerHTML = `
      <h2>Weekly Forecast: ${capitalizeFirst(borough)}</h2>
      <p>Error loading weather data. Please try again.</p>
    `;
  }
}

function displayWeatherData(borough, data) {
  const section = document.getElementById(borough);
  const boroughName = borough === 'staten' ? 'Staten Island' : capitalizeFirst(borough);
  
  let html = `<h2>Weekly Forecast: ${boroughName}</h2>`;
  
  if (data && data.list) {
    const dailyForecasts = [];
    const processedDates = new Set();
    
    data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dateString = date.toDateString();
      
      if (!processedDates.has(dateString) && dailyForecasts.length < 5) {
        dailyForecasts.push(forecast);
        processedDates.add(dateString);
      }
    });
    
    html += '<div class="weather-cards">';
    
    dailyForecasts.forEach(forecast => {
      const date = new Date(forecast.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temp = Math.round(forecast.main.temp - 273.15); // Convert from Kelvin to Celsius
      const tempF = Math.round((temp * 9/5) + 32); // Convert to Fahrenheit
      const description = forecast.weather[0].description;
      const icon = forecast.weather[0].icon;
      
      html += `
        <div class="weather-card">
          <h3>${dayName}</h3>
          <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
          <p class="temp">${tempF}°F (${temp}°C)</p>
          <p class="description">${description}</p>
          <p class="humidity">Humidity: ${forecast.main.humidity}%</p>
        </div>
      `;
    });
    
    html += '</div>';
  } else {
    html += '<p>No weather data available.</p>';
  }
  
  section.innerHTML = html;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener('DOMContentLoaded', () => {
  showForecast('manhattan');
});
