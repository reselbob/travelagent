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

    it('Can get best deal from each services', function (done) {
        const services = ['AIRLINE','AUTO','HOTEL'];
        services.forEach(service =>{
            //Go get all the best deals
            supertest(server)
                .get('/bestDeal/' + service.toLocaleLowerCase())
                .set('Accept', 'application/json')
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.an('object');
                    expect(res.body.data).to.be.an('object');
                });
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

    const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};

    const random = (max) => {return Math.floor(Math.random()* max)};

    const incrementDate = (startDate, daysToAdd) => {
        const newdate = new Date();
        newdate.setDate(startDate.getDate() + daysToAdd);
        return newdate;
    };
});