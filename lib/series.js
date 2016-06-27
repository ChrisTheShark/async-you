"use strict";
const http = require('http'),
      async = require('async'),
      urlOne = process.argv[2],
      urlTwo = process.argv[3];

function get(url, callback) {
    http.get(url, function(response) {
        let body = '';
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function(data) {
            return callback(null, body);
        });
        response.on('error', function(error) {
            return callback(error);
        });
    });
}

/**
 * Taking a few liberties here for testability. This method consumes
 * two URLs and a callback to respond to with data retrieved from a
 * GET request to both enpoints. Responses should be wrapped in an
 * object to retrieve easily.
 * 
 * @param urlOne The first URL to GET.
 * @param urlTwo The first URL to GET.
 * @param callback Handler method to retrieve result or Error.
 */
function gatherResponses(urlOne, urlTwo, callback) {
    async.series({
        requestOne: function(callback) {
            get(urlOne, callback);
        },
        requestTwo: function(callback) {
            get(urlTwo, callback);
        }
    }, function(error, results) {
        if (error) { return callback(error); }
        callback(null, results);
    });
}

module.exports.gatherResponses = gatherResponses;