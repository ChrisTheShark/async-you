"use strict";
const expect = require('chai').expect,
      sinon = require('sinon'),
      http = require('http'),
      each = require('../lib/each');

describe('each', function() {
    it('should return no errors with valid endpoints', (done) => {
        let spy = sinon.spy();
        each.getErrorsIfPresent([
            'http://localhost:3000/greeting', 
            'http://localhost:3000/greeting'],
            spy);
        expect(spy.called).to.be.false;
        done();
    });
    it('should return errors with invalid endpoints', (done) => {
        each.getErrorsIfPresent([
            'http://localhost:3000/greeting', 
            'http://localhost:4242/greeting'], 
            (error) => {
                expect(error.code).to.equal('ECONNREFUSED');
                done();
            }
        );
    });
});