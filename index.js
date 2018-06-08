'use strict';
require('dotenv').config();

const PORT = process.env.PORT;

// const ENV = {};

// ENV.productionApiUrl = 'https://josh-cowsay.herokuapp.com';



require('./src/app.js').start( PORT, () => console.log(`Server up on ${PORT}`));