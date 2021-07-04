const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();
const axios = require('axios'); // require the package
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const weatherData = require('./assets/weather-data.json');

app.use(cors()) // after you initialize your express app instance
// a server endpoint 
app.get('/', (req, res) => { // callback function of what we should do with our request
    res.send('Hello World') // our endpoint function response
})

app.get('/weather-data', (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    // console.log(lat, lon);
    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`
        axios.get(weatherBitUrl).then(response => {
            const resData = response.data.data.map(obj => new Weather(obj));
            res.json(resData)
        }).catch(error => {
            res.send(error.message)
        });
    } else {
        res.send('Please provide the lat & lon')
    }


})

class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description;
        this.date = weatherData.valid_date;
    }
}

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
}) // kick start the express server to work