require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Borough coordinates (latitude, longitude)
const boroughs = {
  manhattan: { lat: 40.7831, lon: -73.9712 },
  brooklyn: { lat: 40.6782, lon: -73.9442 },
  queens: { lat: 40.7282, lon: -73.7949 },
  bronx: { lat: 40.8448, lon: -73.8648 },
  statenisland: { lat: 40.5795, lon: -74.1502 }
};

// Home page with navigation
app.get('/', (req, res) => {
  res.render('index', { boroughs: Object.keys(boroughs) });
});

// Borough weather page
app.get('/:borough', async (req, res) => {
  try {
    const borough = req.params.borough.toLowerCase();
    if (!boroughs[borough]) return res.status(404).send('Borough not found');
    
    const { lat, lon } = boroughs[borough];
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    
    const response = await axios.get(url);
    const weatherData = {
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon
    };
    
    res.render('borough', { 
      borough: borough.charAt(0).toUpperCase() + borough.slice(1),
      weather: weatherData 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching weather data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));