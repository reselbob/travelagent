const chai = require('chai');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const uuidv4 = require('uuid/v4');
const {cryptPassword, comparePassword} = require('../authentication');

describe('Authentication Tests: ', () => {
    it('Can encrypt password', async () => {
        const uuid = uuidv4();
        const result = await cryptPassword(uuid);
        expect(result).to.be.a('string');
    })

});