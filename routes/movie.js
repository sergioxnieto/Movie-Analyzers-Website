const express = require('express');
const router = express.Router();
const parser = require('../parse');


// Demo File
router.get('/movies', (req, res, next) => {
    console.log('received a request');
    console.log(req.query.title)
    res.send(parser.searchForMovie(req.query.title));
});

module.exports = router;