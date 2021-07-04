const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;
const weatherData = require('./assets/weather-data.json');

app.use(cors()) // after you initialize your express app instance
// a server endpoint 
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})

app.get('/weather-data', (req, res) => {
    res.json(weatherData);
})

 
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
}) // kick start the express server to work