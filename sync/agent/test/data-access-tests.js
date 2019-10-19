const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const microservices = require('../services');

describe('Agent Data Access Tests', () => {
    it('Can get best deals', (done) => {
        const dealmakers = ['AIRLINE','AUTO','HOTEL'];
        dealmakers.forEach(async (service) => {
            let error;
            const deal = await microservices[service.toLowerCase()].getBestDeal();
            if(error)done(error);
            expect(deal).to.be.an('object');
            done();
        });
    });
});

