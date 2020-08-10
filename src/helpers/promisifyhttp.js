'use strict';

const http = require('http');
const { Readable } = require('stream');

module.exports = {
    request(options,body) {
        return this._makeRequest(options,body);
    },

    _makeRequest(options,body = {}) {

        // create a new Promise
        return new Promise((resolve, reject) => {

            const request = http.request(options, res => this._onResponse(res, resolve, reject));
            let str= JSON.stringify(body);
            request.setHeader('Content-Length', str.length);
            Readable.from([str]).pipe(request);
            request.on('error', reject);

            // request.end();

        });
    },



    _onResponse(response, resolve, reject) {
        const hasResponseFailed = response.statusCode >= 400;
        var responseBody = '';
        if (hasResponseFailed) {
            reject(`Request to ${response.url} failed with HTTP ${response.status}`);
        }

        response.on('data', chunk => responseBody += chunk.toString());

        response.on('end', () => resolve({rawData:responseBody, headers: response.headers,status:response.statusCode}));
    }
};