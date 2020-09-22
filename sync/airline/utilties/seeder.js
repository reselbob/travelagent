const {getDefaultInventoryItems, getBestDeal} = require('../lib');
const {getReservation, getInventoryItem, getReservations, getInventoryItems } = require('../datastore');
const faker = require('faker');
const uuidv4 = require('uuid/v4');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const port = process.env.APP_PORT || 3000;

/*
This seeder is to be run using a running instance of the airline microservice
available at localhost
 */

const seedInventoryItems = async () =>{
    const existItems = await getInventoryItems();
    if(existItems) return existItems;
    const airlines = await getDefaultInventoryItems();
    const arr = [];
    await airlines.forEach(async airline =>{
        const item = await getInventoryItem();
        item.airline = airline;
        const result = await item.save();
        arr.push(result);
    });
    return arr;
};

const getRandomUser = async () =>{
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.userName = `${user.lastName.substring(0,3)}${user.firstName.substring(0,3)}`;
    user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
    user.phone = faker.phone.phoneNumber();
    user.id = uuidv4();
    return user;
};

const seedReservations = async (numberOfReservations) =>{
    const existingReservations = await getReservations();
    if(existingReservations) return existingReservations;
    const cnt = numberOfReservations || 10;
    const arr = [];
    const vendor = 'Seeder';
    for(let i = 0;i< cnt; i++){

        const deal = await getBestDeal();
        const user = await getRandomUser();
        const res = await getReservation();
        res.user = user;
        res.airline = deal.airline;
        res.flightNumber  = deal.flightNumber;
        res.from  =deal.from;
        res.to  = deal.to;
        res.vendor =  vendor;
        res.departure = deal.departure;
        res.arrival =   deal.arrival;
        res.price =  deal.price;
        console.log({message: 'Saving reservation', data: res});
        const result = await res.save();
        console.log({message: 'Saved reservation', data: res});
        arr.push(result);
    }
    if(arr.length > 0)return arr;
}


module.exports = {seedInventoryItems,seedReservations};

