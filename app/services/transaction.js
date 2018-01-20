'use strict';

let shortid = require('shortid');
let errors = require('app/lib/errors/errors');
const ResourceService = require('app/services/resource');

class TransactionService extends ResourceService {

    /**
     * Account service constructor
     *
     * @constructor
     * @param {logger} logger instance of the logger
     */
    constructor(logger) {
        super(logger);
    }

    /**
     * Add Transaction
     *
     * @param data
     * @returns {Promise.<TResult>}
     */
    add(data) {
        let reqId = shortid.generate();
        this.logger.info(`Request ID: ${reqId} - Going to check transaction age`);

        return this.checkTransactionAge(data.timestamp)
            .then(() => {
                // Do processing and save
                this.logger.info(`Request ID: ${reqId} - Transaction is valid. Logging it...`);
                ResourceService.transactions.push(data);
                let stringifiedArray = JSON.stringify(ResourceService.transactions);
                this.logger.info(`Request ID: ${reqId} - Array before filter ${stringifiedArray}`);
                return this.filterArray();
            })
            .then((filteredArray) => {
                let stringifiedArray = JSON.stringify(filteredArray);
                this.logger.info(`Request ID: ${reqId} - Array after filter ${stringifiedArray}`);
            })
            .catch((error) => {
                //tell the developer what went wrong
                this.logger.error(`Request ID: ${reqId} - The transaction is older than one minute. ` +
                `It is ${error} seconds old`);
                throw errors.TransactionOld('Transaction is older than 60 seconds');
            });
    }

    /**
     * This function checks the age of transactions
     *
     * @memberOf TransactionService
     */
    checkTransactionAge(transactionTimestamp) {
        return new Promise((resolve, reject) => {
            let timediffInseconds = this.getTransactionTimeDiffInSeconds(transactionTimestamp);
            if (timediffInseconds <= 60) {
                return resolve(timediffInseconds);
            } else {
                return reject(timediffInseconds);
            }
        });
    }

}

module.exports = TransactionService;
