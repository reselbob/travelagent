'use strict';
const supertest = require('supertest');
const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const uuidv4 = require('uuid/v4');


const Airline = require('../airline');
const Hotel = require('../hotel');
const Auto = require('../auto');
const Reservation = require('../reservations');
const Users = require('../users');
const faker = require('faker');
const {server, shutdown} = require('../index');
const {seed} = require('../utilities/seeder');

describe('HTTP Tests: ', () => {

    before(async () => {
        //const result =  await seed();
        //return result
    });


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

    const createReservation = async () => {

        const startDate = new Date();
        const daysToAdd = random(15);
        const endDate = incrementDate(startDate,daysToAdd)

        const airline = new Airline();
        const air = airline.getDataHolderSync();
        air.vendor = sample(await airline.getItems());
        air.flightNumber = random(5000);
        air.departure = startDate;
        air.return = endDate;
        air.fare = random(300) + 100;

        const hotel = new Hotel();
        const h = hotel.getDataHolderSync();
        h.vendor = sample(await hotel.getItems());
        h.checkIn = startDate;
        h.checkOut = endDate;
        h.price = (random(100) + 100) * daysToAdd;

        const auto = new Auto();
        const a = auto.getDataHolderSync();
        a.vendor = sample(await auto.getItems());
        a.checkIn = startDate;
        a.checkOut = endDate;
        a.price = random(100) * daysToAdd;

        const user  = createUser();

        const res = new Reservation().getDataHolderSync();
        const userList = await new Users().getItems();

        res.id = uuidv4();
        res.user = sample(userList);
        res.airline = air;
        res.hotel = h;
        res.auto = a;
        res.createDate = new Date();

        return res;
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

    const createUser = () => {
        const user = {};
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
        user.phone = faker.phone.phoneNumber();
        return user;
    };

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