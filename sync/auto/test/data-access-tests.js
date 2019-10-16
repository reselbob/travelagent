const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {getInventoryItem, getReservation} = require('../datastore');

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.MONGODB_DB_NAME;

describe('Data Access Tests Users', () => {
    /*
    it('Can get new Inventory Item by Id', (done) => {
        getInventoryItem('5da3f977393d9f4b255b6d03')
            .then(item => {
                expect(item.auto.make).to.equal('Kia');
                expect(item.auto.model).to.equal('Soul');
                expect(item.auto.year.getFullYear()).to.equal(2014);
                expect(item.vendor).to.equal('NATIONAL');
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

     */
    it('Can get new Inventory Item', (done) => {
        getInventoryItem()
            .then(item => {
                expect(item).to.be.an('object');
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
/*
    it('Can save new Inventory Item', (done) => {
        getInventoryItem()
            .then(item => {
                item.auto.make = 'Audi';
                item.auto.model = '5000';
                item.auto.year = '2018';
                item.vendor = 'ENTERPRISE';
                item.save()
                    .then(result => {
                        console.log(result);
                    });
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
 */
    it('Can get new Reservation', (done) => {
        getReservation()
            .then(item => {
                expect(item).to.be.an('object');
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });

});
