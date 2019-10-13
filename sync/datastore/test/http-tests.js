'use strict';
const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server, shutdown} = require('../index');

const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close();
        console.log('testing done');
        await shutdown();
        console.log('over');
    });

    it('Can get', async () => {
        //Go get all the lists
        await supertest(server)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result => {
                console.log(result);
                //done();
            })
            .catch(err => {
                console.error(err);
                //done(err);
            });
    });

    it('Can delete', async () => {
        //Go get all the lists
        await supertest(server)
            .delete('/')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result => {
                console.log(result);
                //done();
            })
            .catch(err => {
                console.error(err);
                //done(err);
            });
    });
    it('Can post', async () => {
        //Go get all the lists
        await supertest(server)
            .post('/')
            .set('Accept', 'application/json')
            .expect(200)
            .then(result => {
                console.log(result);
                //done();
            })
            .catch(err => {
                console.error(err);
                //done(err);
            });
    });


});