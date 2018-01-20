'use strict';

let httpStatus              = require('http-status');
let errors                  = require('app/lib/errors/errors');

/**
 * Header validation middleware definition
 *
 * @param log an instance of the console logger
 * @returns {Function} matching Restify middleware interface
 */
module.exports.headerValidation = function(log) {

    return function(req, res, next) {

        let headerValidation = req.route.accept; //accept property in route

        if (!headerValidation) {
            return next(); // skip validation if not set
        }

        if (req.headers['content-type'].indexOf(req.route.accept) === 0) {
            log.debug('request content-type correct - ', req.headers['content-type']);

            return next();
        } else {

            log.error('request content-type incorrect - ', req.headers['content-type']);

            res.send(
                httpStatus.BAD_REQUEST,
                new errors.InvalidContentTypeError(
                    'Invalid content-type - expecting ' + req.route.accept
                )
            );
        }
    };
};

/**
 * Route Parameter validation middleware
 *
 * @param log an instance of the console logger
 * @param joi an instance of the joi schema validator
 * @returns {Function}
 */
module.exports.paramValidation = function(log, joi) {

    return function(req, res, next) {

        // always allow validation to allow unknown fields by default.
        let options = {
            allowUnknown: true
        };

        let validation = req.route.validation; //validation object in route

        if (!validation) {
            return next(); // skip validation if not set
        }

        let validProperties = ['body', 'query', 'params'];

        for (let i in validation) {
            if (validProperties.indexOf(i) < 0) {
                log.debug('Route contains unsupported validation key');
                throw new Error('An unsupported validation key was set in route');

            } else {
                if (req[i] === undefined) {
                    log.debug('Empty request ' + i + ' was sent');

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidParamError('Missing request ' + i)
                    );
                    return;
                }

                let result = joi.validate(req[i], validation[i], options);

                if (result.error) {
                    log.debug('validation error - %s', result.error.message);

                    res.send(
                        httpStatus.BAD_REQUEST,
                        new errors.InvalidParamError(
                            'Invalid request ' + i + ' - ' + result.error.details[0].message
                        )
                    );
                    return;

                } else {
                    log.info('successfully validated request parameters');
                }
            }
        }

        next();
    };
};
