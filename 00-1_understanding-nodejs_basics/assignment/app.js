const http = require('http');

http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;

    if (url === '/') {
        res.write("<html>");
        res.write("<head></head>");
        res.write("<body><p>Welcome my assignment</p>");
        res.write("<form action='/create-user' method='POST'><input type='text' name='text'><button type='submit'>Create</button></form>")
        res.write("</body>");
        return res.end();
    }

    if (url === '/users') {
        res.write("<html>")
        res.write("<head></head>")
        res.write("<body><ul><li>User1</li><li>User2</li><li>User3</li</ul></body>")
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parserBody = Buffer.concat(body).toString();
            const user = parserBody.split('=')[1];
            console.log(user);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    }

}).listen(3000);