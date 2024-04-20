// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var query = url.parse(req.url, true).query;
    console.log(pathname);
    console.log(query);

    if (pathname == '/comments') {
        if (req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
                console.log('Partial body: ' + body);
            });
            req.on('end', function () {
                var post = qs.parse(body);
                console.log(post);
                res.end('success');
            });
        }
    }

    if (pathname == '/comments.json') {
        fs.readFile('comments.json', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    }

    if (pathname == '/comments.html') {
        fs.readFile('comments.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
}).listen(3000, 'localhost');
