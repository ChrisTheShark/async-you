"use strict";
const expect = require('chai').expect,
    http = require('http'),
    series = require('../lib/series');

describe('series', () => {
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