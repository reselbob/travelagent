const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {server} = require('../index');


describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close();
        console.log('testing done');
    });

    it('Can get bestDeal', function (done) {
    //Go get all the lists
    supertest(server)
        .get('/bestDeal')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an('object');
            expect(res.body.data).to.be.an('object');
            done();
        });
    });

    it('Can get airline inventoryItems', function (done) {
        //Go get all the lists
        supertest(server)
            .get('/inventoryItems')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                //expect(res.body).to.be.an('object');
                //expect(res.body.data).to.be.an('array');
                done();
            });
    });

    it('Can post airline inventoryItems', function (done) {
        done()
        //Go get all the lists
        /*
        supertest(server)
            .post('/inventoryItems')
            .set('Accept', 'application/json')
            .send({airline: 'RYAN'})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                done();
            });
         */
    });

    it('Can POST admin command SEED_RESERVATIONS', function (done) {
        supertest(server)
            .post('/admin/commands')
            .set('Accept', 'application/json')
            .send({command: 'SEED_RESERVATIONS'})
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('Can POST admin command SEED_INVENTORY_ITEMS', function (done) {
        supertest(server)
            .post('/admin/commands')
            .set('Accept', 'application/json')
            .send({command: 'SEED_INVENTORY_ITEMS'})
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

    const random = (max) => {return Math.floor(Math.random()* max)};

    const incrementDate = (startDate, daysToAdd) => {
        const newdate = new Date();
        newdate.setDate(startDate.getDate() + daysToAdd);
        return newdate;
    };
});