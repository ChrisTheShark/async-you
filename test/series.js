"use strict";
const expect = require('chai').expect,
    sinon = require('sinon'),
    http = require('http'),
    series = require('../lib/series');

describe('series', () => {
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

    it('should response with expected object when invoked with test endpoints', () => {
        let expectedObject = {
            responseOne: 'Hello World!',
            responseTwo: 'It is a GREAT world!'
        };
        series.gatherResponses('http://localhost:3000/greeting',
            'http://localhost:3000/response', (error, data) => {
                if (error) { throw error };
                expect(data).to.deep.equal(expectedObject);
            });
    });
});