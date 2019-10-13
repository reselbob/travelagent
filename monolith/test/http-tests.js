'use strict';
const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;

const {createUser, createReservation} = require('../utilities/seeder');

const Reservation = require('../reservations');
const {server} = require('../index');


describe('HTTP Tests: ', () => {
    after(async () => {
        await server.close();
        console.log('testing done');
    });

    it('Can get auto', function (done) {
        //Go get all the lists
        supertest(server)
            .get('/auto')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.vendors).to.be.an('array');
                expect(res.body.service).to.equal('auto');
                done();
            });
    });

    it('Can get auto best deal', function (done) {
        supertest(server)
            .get('/auto/bestDeal')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                expect(res.body.service).to.equal('autoBestDeal');
                done();
            });
    });

    it('Can get airline', function (done) {
        //Go get all the lists
        supertest(server)
            .get('/airline')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.vendors).to.be.an('array');
                expect(res.body.service).to.equal('airline');
                done();
            });
    });
    it('Can get airline best deal', function (done) {
        supertest(server)
            .get('/airline/bestDeal')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                expect(res.body.service).to.equal('airlineBestDeal');
                done();
            });
    });

    it('Can get hotel', function (done) {
        supertest(server)
            .get('/hotel')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.vendors).to.be.an('array');
                expect(res.body.service).to.equal('hotel');
                done();
            });
    });
    it('Can get hotels best deal', function (done) {
        supertest(server)
            .get('/hotel/bestDeal')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                expect(res.body.service).to.equal('hotelBestDeal');
                done();
            });
    });

    it('Can get reservations', function (done) {
        supertest(server)
            .get('/reservations')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('array');
                expect(res.body.service).to.equal('reservations');
                done();
            });
    });

    it('Can get reservations best deal', function (done) {
        supertest(server)
            .get('/reservations/bestDeal')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                expect(res.body.service).to.equal('reservationBestDeal');
                done();
            });
    });

    it('Can get a reservation', async () => {
        const item = sample(await new Reservation().getItems());
        const url = `/reservations?id=${item.id}`;
        supertest(server)
            .get(url)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body.data).to.be.an('object');
                expect(res.body.data.airline).to.be.an('object');
                expect(res.body.data.hotel).to.be.an('object');
                expect(res.body.data.auto).to.be.an('object');
                expect(res.body.service).to.equal('reservations');
            });
    });

    const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

    const random = (max) => {return Math.floor(Math.random()* max)};

    const incrementDate = (startDate, daysToAdd) => {
        const newdate = new Date();
        newdate.setDate(startDate.getDate() + daysToAdd);
        return newdate;
    };

    it('Can post reservations', async () => {

        const res = await createReservation();
        await supertest(server)
            .post('/reservations')
            .send(res)
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) =>{
                if (res.statusCode !== 200) return done(res);
                expect(res.body).to.be.an('object');
                expect(res.body.service).to.equal('reservations');
            });
    });

    it('Can post users', async () => {
        //Go get all the lists
        const user = await createUser();
        await supertest(server)
            .post('/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect(200)
            .then((res) =>{
                if (res.statusCode !== 200) return done(res);
                expect(res.body).to.be.an('object');
                expect(res.body.service).to.equal('users');
            });
    });
});