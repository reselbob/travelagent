const supertest = require('supertest');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const {createUserSync} =  require('../utilties/seeder');
const {server} = require('../index');


describe('HTTP Tests: ', () => {
    after(async (done) => {
        await server.close();
        console.log('testing done');
    });


    it('Can get users', function (done) {
        //Go get all the lists
        supertest(server)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
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

    it('Can post users', async () => {
        //Go get all the lists
        const user = await createUserSync();
        await supertest(server)
            .post('/users')
            .set('Accept', 'application/json')
            .set('Content-Type','application/json')
            .send(user)
            .expect(200)
            .then((res) =>{
                if (res.statusCode !== 200) return done(res);
                expect(res.body).to.be.an('object');
                console.log(res.body);
            });
    });
});