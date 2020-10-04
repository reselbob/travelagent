const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {getInventoryItem, getInventoryItems, getReservation} = require('../datastore');
// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.MONGODB_DB_NAME;

describe('Data Access Tests', () => {
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

    it('Can get Inventory Items', (done) => {
        getInventoryItems()
            .then(items => {
                expect(items).to.be.an('array');
                items.forEach(item => {
                    expect(item.airline).to.be.a('string');
                    expect(item.created).to.be.a('date');
                });
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
});
