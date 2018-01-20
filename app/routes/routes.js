/**
 @description Setup routes
 **/

'use strict';

/** Application Routes **/
module.exports.register = function(server, serviceLocator) {

    /**
     * POST transactions
     */
    server.post({
        path: '/transactions',
        name: 'add_transactions',
        version: '1.0.0',
        validation: {
            body: require('app/validations/transactions')
        }
    }, (req, res, next) => serviceLocator.get('transactionController').add(req, res, next));

    /**
     * GET statistics
     */
    server.get({
        path: '/statistics',
        name: 'get_statistics',
        version: '1.0.0'
    }, (req, res, next) => serviceLocator.get('statisticsController').get(req, res, next));

};
