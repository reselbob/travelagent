const faker = require('faker');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};




const createUserSync = () => {
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.userName = `${user.lastName.substring(0,3)}${user.firstName.substring(0,3)}`;
    user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
    user.phone = faker.phone.phoneNumber();
    return user;
};

const seed = async () => {

};
//fire it off here
seed();

module.exports = {seed,createUserSync};