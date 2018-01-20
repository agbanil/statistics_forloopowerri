/**
 @description web service code for API.
 **/

'use strict';

// include dependencies
const config     = require('app/config/config');
const routes     = require('app/routes/routes');
const handlers   = require('app/routes/handlers');
const restify    = require('restify');
const versioning = require('restify-url-semver');
const joi        = require('joi');

const serviceLocator = require('app/config/di');

// Initialize web service
let server = restify.createServer({
    name: config.appName,
    versions: ['1.0.0'],
    formatters: {
        'application/json': require('app/lib/formatters/jsend')
    }
});

// Initialize web logger
let log = serviceLocator.get('logger');

// Set API versioning and allow trailing slashes
server.pre(restify.pre.sanitizePath());
server.pre(versioning({ prefix: '/' }));

// Set request handling and parsing
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

let validationMiddleware = require('app/lib/validation_middleware');

server.use(validationMiddleware.paramValidation(log, joi)); // verification for request parameters
server.use(validationMiddleware.headerValidation(log)); // verification of content type header

// Setup Error Event Handling
handlers.register(server);

// Setup Routing
routes.register(server, serviceLocator);

// inform
server.listen(config.webserver.port, () => {
    log.info('%s listening at %s', server.name, server.url);

    if (process.env.NODE_ENV === 'development') {
        require('app/lib/js_route_table')(server.router.mounts);
    }
});

module.exports = server;
