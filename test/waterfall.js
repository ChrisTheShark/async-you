"use strict";
const expect = require('chai').expect,
      http = require('http'),
      path = require('path'),
      waterfall = require('../lib/waterfall');

describe('waterfall', () => {
    it('should respond with greeting if pointed to test url.', (done) => {
        waterfall.readDataFromFlatFileUrl(
            path.join(__dirname + '/files/single_url.txt'), 
            (error, data) => {
                if (error) { throw error; }
                expect(data).to.equal('Hello World!');
                done();
            }
        );
    });
});