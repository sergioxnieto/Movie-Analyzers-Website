const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.static('public'));

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