const http = require('http');
const { kill } = require('process');

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }
  if(req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
   
  }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First Page</title></head>');
    res.write('<body>Hello from NodeJS</body>');
    res.write('</html>');
    return res.end();
});

server.listen(3000);