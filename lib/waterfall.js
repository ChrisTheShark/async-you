"use strict";
const fs = require('fs'),
      http = require('http'),
      async = require('async');

function readUrlFromFile(filename, callback) {
    fs.readFile(filename, 'utf8', function(error, data) {
        if (error) { return callback(error); }
        callback(null, data);
    });
}

function readDataFromUrl(url, callback) {
    http.get(url, function(response) {
        let body = '';
        response.on('data', function(data) {
            body += data;
        });
        response.on('end', function() {
            callback(null, body);
        });
        response.on('error', function(error) {
            callback(error);
        });
    });
}

/**
 * Taking a few liberties here for testability. This method consumes
 * a filename and a callback to respond to with data retrieved from a
 * URL contained in the file passed for the first argument.
 * 
 * @param filename The file containing a URL to GET.
 * @param callback Handler method to retrieve result or Error.
 */
function readDataFromFlatFileUrl(filename, callback) {
    async.waterfall([
    function(callback) {
        readUrlFromFile(filename, callback);
    },
    function(url, callback) {
        readDataFromUrl(url, callback)
    }
    ], function(error, body) {
        if (error) { return callback(error); }
        callback(null, body);
    });
}

module.exports.readDataFromFlatFileUrl = readDataFromFlatFileUrl;