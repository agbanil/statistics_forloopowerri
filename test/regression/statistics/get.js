'use strict';

let server          = require('server');
let request         = require('supertest')(server);
let joi             = require('joi');

describe('GET /statistics', () => {

    it('Should return 200 when called', (done) => {
        request.get(`/v1/statistics`)
            .send()
            .expect('Content-type', /json/)
            .expect(200)
            .expect((res) => {
                const schema = joi.object().keys({
                    sum: joi.number().required(),
                    avg: joi.number().required(),
                    min: joi.number().required(),
                    max: joi.number().required(),
                    count: joi.number().required()
                });

                joi.assert(res.body, schema);
            })
            .end(done);
    });
});
