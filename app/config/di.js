'use strict';

const serviceLocator    = require('app/lib/service_locator');
let config     = require('app/config/config');

const StatisticsController  = require('app/controllers/statistics');
const TransactionController = require('app/controllers/transaction');

const StatisticsService    = require('app/services/statistics');
const TransactionService      = require('app/services/transaction');

/**
 * Returns an instance of the logger.
 */
serviceLocator.register('logger', () => {
    return require('app/lib/logger').create(config.application_logging);
});

/**
 * Registers a statistics service
 */
serviceLocator.register('statisticsService', (serviceLocator) => {
    let logger = serviceLocator.get('logger');

    return new StatisticsService(logger);
});

/**
 * Registers the transaction service
 */
serviceLocator.register('transactionService', (serviceLocator) => {
    let logger = serviceLocator.get('logger');

    return new TransactionService(logger);
});

/**
 * Returns an instance of statistics controller
 */
serviceLocator.register('statisticsController', (serviceLocator) => {
    let logger = serviceLocator.get('logger');
    let statisticsService = serviceLocator.get('statisticsService');

    return new StatisticsController(logger, statisticsService);
});

/**
 * Returns an instance of transaction controller
 */
serviceLocator.register('transactionController', (serviceLocator) => {
    let logger = serviceLocator.get('logger');
    let transactionService = serviceLocator.get('transactionService');

    return new TransactionController(logger, transactionService);
});

module.exports = serviceLocator;
