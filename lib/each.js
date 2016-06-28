"use strict";
const http = require('http'),
      async = require('async');

function getErrorsIfPresent(urls, callback) {
    async.each(urls, (element, done) => {
        http.get(element, (response) => {
            response.on('end', () => {
                done(null);
            });
        }).on('error', (error) => {
            done(error);
        });
    }, (error) => {
        if (error) { callback(error); }
    });
}

module.exports.getErrorsIfPresent = getErrorsIfPresent;