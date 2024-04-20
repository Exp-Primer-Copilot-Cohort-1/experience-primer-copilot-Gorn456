// Create web server and listen to port 3000
// to run: $ node comments.js

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var server = http.createServer(function(req, res) {
    if (req.url == '/comments.html') {
        fs.readFile('comments.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }
    else if (req.url == '/comment') {
        var postData = '';
        req.on('data', function(chunk) {
            postData += chunk;
        });
        req.on('end', function() {
            postData = qs.parse(postData);
            fs.appendFile('comments.txt', postData['comment'] + '\n', function(err) {
                if (err) {
                    console.log('Error writing file');
                }
            });
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write('<a href="/comments.html">Back</a>');
            res.end();
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('Page not found');
        res.end();
    }
});

console.log('Server running at http://') ;
