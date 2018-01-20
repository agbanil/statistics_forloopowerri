'use strict';

let server          = require('server');
let request         = require('supertest')(server);
let httpStatus      = require('http-status');

let oldTransactionFixture = {amount: 24, timestamp: 1508766798072};
let validTransactionFixture = {amount: 24, timestamp: (new Date()).getTime()};

const ENDPOINT = '/v1/transactions';

describe('POST /transactions', () => {

    it('Should fail with HTTP 204 when old transaction is passed', (done) => {
        request.post(ENDPOINT)
            .send(oldTransactionFixture)
            .expect(httpStatus.NO_CONTENT)
            .end(done);
    });

    it('Should be successful with HTTP 201 when correct transaction is passed',
    (done) => {
        request.post(ENDPOINT)
            .send(validTransactionFixture)
            .expect(httpStatus.CREATED)
            .end(done);
    });

});
