'use strict';

let httpStatus = require('http-status');
let errors     = require('app/lib/errors/errors');

/**
 * Controller responsible for calculating statistics
 *
 * @class
 */
class StatisticsController {

    /**
    * Constructs a new StatisticsController
    *
    * @constructor
    * @param {StatisticsService} statisticsService An instance of Statistics Service
    * @param {Logger} logger An instance of the logger
    */
    constructor(logger, statisticsService) {
        this.statisticsService  = statisticsService;
        this.logger = logger;
    }

    /** Endpoint GET /statistics
     *
     * @param {object} req Restify request object
     * @param {object} res Restify response object
     * @param {function} next Restify routing callback
     * @returns {Promise}
     */
    get(req, res, next) {

        this.statisticsService.get()
            .then((data) => res.send(httpStatus.OK, data))
            .catch((error) => {
                switch (error.constructor) {
                    default:
                        res.send(httpStatus.INTERNAL_SERVER_ERROR,
                            new errors.InternalServerError('Internal Server Error'));
                }

            });
        next();
    }

}

module.exports = StatisticsController;
