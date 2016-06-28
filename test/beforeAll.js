"use strict";
const expect = require('chai').expect,
    http = require('http');

let server;
before(() => {
    server = http.createServer((request, response) => {
        if (request.method === 'GET' && request.url === '/greeting') {
            response.end('Hello World!');
        } else if (request.method === 'GET' && request.url === '/response') {
            response.end('It is a GREAT world!');
        }
    });
    server.listen(3000);
});
after(() => {
    server.close();
})