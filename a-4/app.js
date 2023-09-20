const http = require('http');

function handleRequest(request, response) { 
    
    if (request.url == '/currenttime') { // localhost:3000/currenttime
        // path는 관례적으로 다 소문자 + 페이지에 대한 설명 (/users, /products, ...)
        response.statusCode = 200;
        response.end("<h1>" + new Date().toISOString() + "</h1>");
    } else if (request.url == '/') { // localhost:3000
        response.statusCode = 200;
        response.end("<h1>Hello world!</h1>");
    }
}

const server = http.createServer(handleRequest);

server.listen(3000);