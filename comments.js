// create web server
// npm install express
// npm install body-parser

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

var comments = [];

app.get('/comments', function(req, res) {
    res.send(comments);
});

app.post('/comments', function(req, res) {
    comments.push(req.body.comment);
    res.send(comments);
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});

// run server
// node comments.js
// open browser