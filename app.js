// Express import and initialization
const express = require('express');
const app = express();

// Port to open localhost:{PORT}
const PORT = 3000;

// Import all the necessary routing files for our API
const indexRouter = require('./routes/index');

// This hosts our website. Public refers to the public folder
// in the directory which has the scripts, stylesheet, and html
app.use(express.static('public'));


// Insert the routes which the API will be able to handle
app.use('/test', indexRouter);    // Demo route


// This is what keeps the site listening for events
app.listen(PORT, () => {
    console.log('App running...');
    console.log(`Listening on ${PORT}`);
})



/* Old Method

var app = require('http').createServer(response);
var fs = require('fs');
app.listen(3000);
console.log("App running...");
function response(req, res) {
    console.log("Got a request...");
    var file = "";
    if (req.url == "/") {
        file = __dirname + '/index.html';
    } else {
        file = __dirname + req.url;
    }
    fs.readFile(file, function(err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Page or file not found');
        }
    res.writeHead(200);
        res.end(data);
    });
}

*/