'use strict';

class ResourceService {

    /**
     * To use this class, simply extend it. In the constructor,
     * make a call to the super constructor
     *
     * @param logger
     */
    constructor(logger) {
        this.logger = logger;
    }

    /**
     * This function returns the time difference b/w
     * the current time and the time sent in the payload
     *
     * @param {any} timestamp
     * @returns timediffInseconds
     *
     * @memberOf TransactionService
     */
    getTransactionTimeDiffInSeconds(timestamp) {
        let currentTimeStamp = (new Date()).getTime();
        let timediffInMilliseconds = currentTimeStamp - parseInt(timestamp);
        let timediffInseconds = timediffInMilliseconds / 1000;

        return Math.round(Math.abs(timediffInseconds));
    }

    /**
     * This function filters the transaction array removing transactions
     * Greater than one minute ago
     *
     * @returns {Promise}
     * @memberOf TransactionService
     */
    filterArray() {
        return new Promise((resolve) => {
            ResourceService.transactions = ResourceService.transactions.filter((transactionData) => {
                return this.getTransactionTimeDiffInSeconds(transactionData.timestamp) <= 60;
            });

            return resolve(ResourceService.transactions);
        });
    }
}
ResourceService.transactions = [];

module.exports = ResourceService;
