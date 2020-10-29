const express = require('express');
const router = express.Router();
const parser = require('../parse');

router.get('/movies', (req, res, next) => {
    console.log('Received a request to search for a movie...');
    console.log('Movie title: ' + req.query.title);
    res.send(parser.searchForMovie(req.query.title));
    console.log('Request fulfilled\n');
});

router.get('/load', (req, res, next) => {
    console.log('Received a request to load original CSV');
    parser.loadCsv();
    res.send('Original CSV loaded');
    console.log('Original CSV loaded\n');
});

module.exports = router;