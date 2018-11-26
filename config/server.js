/**
 * HTTP and HTTPS create server and receiver request
 * 
 */

//dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./index');
const fs = require('fs');
const { handlers, router } = require('../routes');

// Server logic for http and https
const unifiedServer = (req, res) => {
    //Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toLowerCase();

    //Get the headers as an object
    const headers = req.headers;

    // Get the payload
    const decoder = new StringDecoder('utf-8');
    let buffer = ``;
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        buffer += decoder.end();

        //Choose the handler this request should go.
        let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        //Route the request to the handler
        chosenHandler(data, (statusCode, payload) => {
            // Use the statusCode called back by the handler or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            // Use the payload called back by the handler, or default to an empty payload
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);

            //Return the response
            res.setHeader('Content-Type', "application/json");
            res.writeHead(statusCode);
            res.end(payloadString);

            //Log payload string
            console.log('Returning payload response: ', statusCode, payloadString);
        });
    });
}

const httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
};

//Instatiate the HTTP Server
const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

//Instatiate the HTTPS Server
const httpsServer = https.createServer(httpsServerOptions, (req, res) => {
    unifiedServer(req, res);
});


module.exports = {
    httpServer,
    httpsServer
}