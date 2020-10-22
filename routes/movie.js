const express = require('express');
const router = express.Router();
const parser = require('../parse');


// Demo File
router.get('/movie', (req, res, next) => {

    res.send(parser.searchForMovie('shrek'));
});

module.exports = router;