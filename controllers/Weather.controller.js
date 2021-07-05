const Weather = require('../models/Weather.model');
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const axios = require('axios'); // require the package
require('dotenv').config();

const weatherController = (req, res) => {
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
}
module.exports = weatherController;