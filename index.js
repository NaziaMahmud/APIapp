import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const bronxAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=40.83&lon=-73.86&appid=fd8037143be63499642841963b9ab217";
const brooklynAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=40.65&lon=-73.95&appid=fd8037143be63499642841963b9ab217";
const queensAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=40.74&lon=-73.79&appid=fd8037143be63499642841963b9ab217";
const manhattanAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=40.77&lon=-73.97&appid=fd8037143be63499642841963b9ab217";
const statenIslandAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=40.57&lon=-74.15&appid=fd8037143be63499642841963b9ab217";

app.get('/bronx', async (req, res) => {
  try {
    const response = await axios.get(bronxAPI);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Bronx API');
  }
});

app.get('/brooklyn', async (req, res) => {
  try {
    const response = await axios.get(brooklynAPI);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Brooklyn API');
  }
});

app.get('/queens', async (req, res) => {
  try {
    const response = await axios.get(queensAPI);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Queens API');
  }
});

app.get('/manhattan', async (req, res) => {
  try {
    const response = await axios.get(manhattanAPI);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Manhattan API');
  }
});

app.get('/staten', async (req, res) => {
  try {
    const response = await axios.get(statenIslandAPI);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching data from Staten Island API');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET /           - Main webpage`);
  console.log(`   GET /bronx      - Bronx weather data`);
  console.log(`   GET /brooklyn   - Brooklyn weather data`);
  console.log(`   GET /queens     - Queens weather data`);
  console.log(`   GET /manhattan  - Manhattan weather data`);
  console.log(`   GET /staten     - Staten Island weather data`);
});