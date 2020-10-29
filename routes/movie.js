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

router.get('/backup', (req, res, next) => {
    console.log('Received a request to save current data state');
    parser.backupCsv();
    res.send('CSV saved');
    console.log('Current state saved\n');
});

// router.get('/remove', (req, res, next) => {
//     console.log('received a save request');
//     parser.backupCsv();
//     res.send('CSV saved');
// });

router.post('/addMovie',(req, res, next) => {
    console.log('Received a POST request for new movie entry');
    parser.addAMovie(req.body);
    res.json({success: true}); // Homepage knows when the process is done
    console.log('Added movie to the database\n');
});

module.exports = router;