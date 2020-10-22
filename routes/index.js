const express = require('express');
const router = express.Router();


// Demo File
router.get('/demo', (req, res, next) => {
    res.send('This is just a test to see if the network routing works')
});

module.exports = router;