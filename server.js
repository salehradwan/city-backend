const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;

const weatherController = require('./controllers/Weather.controller');
const indexController = require('./controllers/Index.controller');


app.use(cors()) // after you initialize your express app instance
// a server endpoint 
app.get('/', indexController)

app.get('/weather-data', weatherController)


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
}) // kick start the express server to work