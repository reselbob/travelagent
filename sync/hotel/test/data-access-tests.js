const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {getInventoryItem, getReservation,getInventoryItemModel} = require('../datastore');
const seeder = require('../utilities/seeder');
const faker = require('faker');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

// Connection URL
const url = process.env.MONGODB_URL;

// Database Name
const dbName = process.env.MONGODB_DB_NAME;
const vendors = ['HILTON', 'BW', 'W', 'SHERATON', 'MOTEl6', 'RAMADA'];


describe('Data Access Tests', () => {

    it('Can create new Inventory Item', (done) => {
        getInventoryItem()
            .then(item => {
                item.property =  {
                    address_1: faker.address.streetAddress(),
                    address_2: faker.address.secondaryAddress(),
                    city: faker.address.city(),
                    state_province: faker.address.stateAbbr(),
                    postal_code: faker.address.zipCode(),
                    country: 'USA',
                    phone: faker.phone.phoneNumber()
                };
                item.vendor = sample(vendors);
                return item.save();
            })
            .then(result => {
                expect(result).to.be.an('object');
                done();
            })
            .catch(err => {
                console.error(err);
                done(err);
            });
    });
});
