/**
@description Define errors available in LocationService
**/

'use strict';

const create = require('custom-error-generator');

/**
 * Custom internal LocationService errors.
 *
 * @type {Object}
 */

module.exports = {

    InternalServerError: create('InternalServerError', { code: 'INTERNAL_SERVER_ERROR' }),

    TransactionOld: create('TransactionOld', { }),

    InvalidParamError: create('InvalidParamError', { code: 'INVALID_PARAMS' }),

    InvalidContentTypeError: create('InvalidContentType', { code: 'INVALID_CONTENT_TYPE' })
};
