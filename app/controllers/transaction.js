'use strict';

let httpStatus = require('http-status');
let errors     = require('app/lib/errors/errors');

/**
 * Controller responsible for holding and scrutinizing transactions
 *
 * @class
 */
class TransactionController {

    /**
     * Constructs a new Transaction Controller.
     *
     * @constructor
     * @param {TransactionService} transactionService An instance of transaction service
     * @param {Logger} logger An instance of the logger
     */
    constructor(logger, transactionService) {
        this.transactionService  = transactionService;
        this.logger = logger;
    }

    /**
     * Endpoint POST /transaction
     *
     * @param {object} req Restify request object
     * @param {object} res Restify response object
     * @param {function} next Restify routing callback
     */
    add(req, res, next) {
        const body = req.body;

        this.transactionService.add(body)
            .then(() => res.send(httpStatus.CREATED, {}))
            .catch((error) => {
                switch (error.constructor) {
                    case errors.TransactionOld:
                        res.send(httpStatus.NO_CONTENT, {});
                        break;
                    default:
                        res.send(httpStatus.INTERNAL_SERVER_ERROR,
                            new errors.InternalServerError('Internal Server Error'));
                }
            });
        next();
    }
}

module.exports = TransactionController;
