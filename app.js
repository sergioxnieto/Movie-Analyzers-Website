// Express import and initialization
const express = require('express');
const app = express();

// Port to open localhost:{PORT}
const PORT = 3000;

// Import all the necessary routing files for our API
const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');

// This hosts our website. Public refers to the public folder
// in the directory which has the scripts, stylesheet, and html
app.use(express.static('public'));

app.use(express.json());

// Insert the routes which the API will be able to handle
app.use('/test', indexRouter);    // Demo route
app.use('/', movieRouter);


// This is what keeps the site listening for events
app.listen(PORT, () => {
    console.log('App running...');
    console.log(`Listening on ${PORT}`);
});