var http = require('http');
var url = require('url');
var querystring = require('querystring');

function handleLoginRequest(req, res) {
    if (req.method === 'GET') {
        var parsedUrl = url.parse(req.url, true);
        var qs = parsedUrl.query;
        var name = qs.name;
        var email = qs.email;

        if (name && email) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write(' your email id  has been registered successfully');
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write('Missing name or email');
        }
        res.end();
    } else if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            var postData = querystring.parse(body);
            var name = postData.name;
            var email = postData.email;

            if (name && email) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('your email id has been registered successfully ');

            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.write('Missing name or email');
            }
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.write('Method Not Allowed');
        res.end();
    }
}

function handleSignUpRequest(req, res) {
    if (req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            var postData = querystring.parse(body);
            var name = postData.name;
            var email = postData.email;
            var password = postData.password;

            if (name && email && password) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('you have successfully signed up ');

            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.write('Missing name, email, or password');
            }
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.write('Method Not Allowed');
        res.end();
    }
}

function onRequest(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;

    if (pathname === '/login') {
        handleLoginRequest(req, res);
    } else if (pathname === '/signup') {
        handleSignUpRequest(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
        res.end();
    }
}

http.createServer(onRequest).listen(8099);
console.log("Server is started on port 8099...");