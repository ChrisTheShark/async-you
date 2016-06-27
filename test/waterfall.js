"use strict";
const expect = require('chai').expect,
      sinon = require('sinon'),
      http = require('http'),
      waterfall = require('../lib/waterfall');

describe('waterfall', () => {
    let server;
    before(() => {
        server = http.createServer((request, response) => {
            if (request.method === 'GET' && request.url === '/greeting') {
                response.end('Hello World!');
            }
        });
        server.listen(3000);
    });
    after(() => {
        server.close();
    })

    it('should respond with greeting if pointed to test url.', () => {
        waterfall.readDataFromFlatFileUrl('single_url.txt', (error, data) => {
            if (error) { throw error; }
            expect(data).to.equal('Hello World!');
        });
    });
});