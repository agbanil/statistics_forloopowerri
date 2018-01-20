/**
 * @description Sets up the restify handlers.
 */

'use strict';

/**
 * Allows us to register the restify server handlers.
 *
 * @param  {server} server An instance of the restify server
 */
module.exports.register = function setup(server) {

    var httpStatusCodes = require('http-status');

    server.on('NotFound', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new Error('Method not Implemented', 'METHOD_NOT_IMPLEMENTED')
        );
    });

    server.on('VersionNotAllowed', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new Error('Unsupported API version requested', 'INVALID_VERSION')
        );
    });

    server.on('InvalidVersion', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new Error('Unsupported API version requested', 'INVALID_VERSION')
        );
    });

    server.on('uncaughtException', (req, res, route, err) => {
        res.send(
            httpStatusCodes.INTERNAL_SERVER_ERROR,
            err
        );
    });

    server.on('MethodNotAllowed', (req, res) => {
        res.send(
            httpStatusCodes.METHOD_NOT_ALLOWED,
            new Error('Method not Implemented', 'METHOD_NOT_ALLOWED')
        );
    });

};
