// create web server
// create web server
const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/comments' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const comment = parsedBody.split('=')[1];
      fs.appendFile('comments.txt', comment + '\n', (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('<form action="/comments" method="POST"><input type="text" name="comment"><button type="submit">Add Comment</button></form>');
    res.write('</html>');
    return res.end();
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
// Path: comments.txt
// this is a comment
// this is another comment
// this is a third comment
// this is a fourth comment
// this is a fifth comment
// this is a sixth comment
// this is a seventh comment
// this is an eighth comment
// this is a ninth comment
// this is a tenth comment
// this is an eleventh comment
// this is a twelfth comment
// this is a thirteenth comment
// this is a fourteenth comment
// this is a fifteenth comment
// this is a sixteenth comment
// this is a seventeenth comment
// this is an eighteenth comment
// this is a nineteenth comment
// this is a twentieth comment
// this is a twenty-first comment
// this is a twenty-second comment
// this is a twenty-third comment
// this is a twenty-fourth comment
// this is a twenty-fifth comment
// this is a twenty-sixth comment
// this is a twenty-seventh comment
//