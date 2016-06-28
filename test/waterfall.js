"use strict";
const expect = require('chai').expect,
      sinon = require('sinon'),
      http = require('http'),
      waterfall = require('../lib/waterfall');

describe('waterfall', () => {
    it('should respond with greeting if pointed to test url.', () => {
        waterfall.readDataFromFlatFileUrl('single_url.txt', (error, data) => {
            if (error) { throw error; }
            expect(data).to.equal('Hello World!');
        });
    });
});