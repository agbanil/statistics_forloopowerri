'use strict';

let joi = require('joi');

module.exports = {
    amount: joi.number().required(),
    timestamp: joi.number().required()
};
