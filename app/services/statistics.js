'use strict';

let shortid = require('shortid');
let ResourceService = require('app/services/resource');

class StatisticsService extends ResourceService {

    /**
     * Service constructor
     *
     * @constructor
     * @param  {Logger} logger An instance of the logger
     * @return {StatisticsService} An instance of the StatisticsService
     */
    constructor(logger) {
        super(logger);
    }

     /**
     * Get Statistics for the last one minute
     * @returns {Promise}
     */
    get() {
        let reqId = shortid.generate();
        let stringifiedArray = JSON.stringify(ResourceService.transactions);
        this.logger.info(`Request ID: ${reqId} - Get statistics called, filtering array ${stringifiedArray}`);
        return this.filterArray()
            .then((arrayToWorkWith) => {
                this.logger.info(`Request ID: ${reqId} - Array filtered ${JSON.stringify(arrayToWorkWith)}`);
                let sum = 0;
                let min = 0;
                let max = 0;
                let avg = 0;
                let count = arrayToWorkWith.length;
                for (let transaction of ResourceService.transactions) {
                    sum += transaction.amount;
                    if (min === 0 || min > transaction.amount)
                        min = transaction.amount;
                    max = Math.max(max, transaction.amount);
                }

                let average = (sum / count);
                avg = average || 0;
                ResourceService.transactions = arrayToWorkWith;
                return { sum: sum, avg: avg, min: min, max: max, count: count };
            })
            .catch((error) => {
                this.logger.error(`Request ID: ${reqId} - There was an error filtering array`);
                throw error;
            });
    }

}

module.exports = StatisticsService;
