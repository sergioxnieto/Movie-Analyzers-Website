const express = require('express');
const router = express.Router();
const parser = require('../parse');


// Demo File
router.get('/movie', (req, res, next) => {
    console.log('received a request');
    console.log(req.body)
    res.send(parser.searchForMovie('shrek'));
});

module.exports = router;