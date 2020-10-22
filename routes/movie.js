const express = require('express');
const router = express.Router();
import {retrieveMovie} from '../parse';


// Demo File
router.get('/movie', (req, res, next) => {
    res.send('This is just a test to see if the network routing works')
});

module.exports = router;