// Express import and initialization
const express = require('express');
const app = express();
const dataBase = require('./dataManip');

// Port to open localhost:{PORT}
const PORT = 3000;

// Import all the necessary routing files for our API
const movieRouter = require('./routes/movie');

// This hosts our website. Public refers to the public folder
// in the directory which has the scripts, stylesheet, and html
app.use(express.static('public'));

// Parses requests and places content in res.body on each server route
app.use(express.json());

// Insert the routes which the API will be able to handle
app.use('/movies', movieRouter);

// This is what keeps the site listening for events
app.listen(PORT, () => {
    console.log('App running...');
    console.log('Loading data onto memory...')
    dataBase.loadCsv();
    console.log(`Listening on ${PORT}`);
});