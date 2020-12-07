const express = require('express');
const router = express.Router();
const dataBase = require('../dataManip');

router.get('/search', (req, res, next) => {
    console.log('Request: search for movie ');
    console.log('Movie title: ' + req.query.title);
    res.send(dataBase.searchForMovie(req.query.title, req.query.category));
    console.log('Done: search completed\n');
});

router.get('/load-original-data', (req, res, next) => {
    console.log('Request: load unmodified data');
    dataBase.loadCsv();
    res.send('Response: unmodified data loaded');
    console.log('Done: unmodified data loaded\n');
});

router.get('/load-modified-data', (req, res, next) => {
    console.log('Request: load modified data');
    dataBase.loadModifiedCsv();
    res.send('Response: modified data loaded');
    console.log('Done: modified data loaded\n');
});

router.get('/backup-data', (req, res, next) => {
    console.log('Request: save current state of data');
    dataBase.backupCsv();
    res.send('Response: saved modifications');
    console.log('Done: saved modifications to backup CSV\n');
});

router.delete('/remove-movie', (req, res, next) => {
    console.log('Request: delete movie with ID ' + req.body.movie_id);
    dataBase.removeMovieEntry(req.body.movie_id);
    res.send('Response: entry deleted');
    console.log('Done: entry ' + req.body.movie_id + ' removed!');
});

router.post('/add-movie',(req, res, next) => {
    console.log('Request: create a new movie entry');
    dataBase.addAMovie(req.body);
    res.json({success: true}); // Homepage knows when the process is done
    console.log('Done: movie entry created and added to database\n');
});

router.put('/edit-movie',(req, res, next) => {
    console.log('Request: update a movie entry');
    dataBase.removeMovieEntry(req.body.id);
    dataBase.addAMovie(req.body);
    res.json({success: true}); // Homepage knows when the process is done
    console.log('Done: updated movie entry\n');
});

router.put('/make-graph',(req, res, next) => {
    console.log('Request: make a analytic graph');
    dataBase.makeAnalytics(req.body);
    res.json({success: true}); // Homepage knows when the process is done
    console.log('Done: made graph\n');
});

module.exports = router;