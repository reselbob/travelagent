const axios = require('axios');
const faker = require('faker');
const {getReservation, getReservations} = require('../datastore');
const sample = (items) => {
    return items[Math.floor(Math.random() * items.length)];
};
const random = (max) => {
    return Math.floor(Math.random() * max)
};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const seedTravelAgent = async (urlsConfig) => {
    const existingReservations = await getReservations();
    if( existingReservations) return existingReservations;

    const obj = {};
    //get a random hotel inventory item
    const hotelItems = await axios.get(`${urlsConfig.hotel}/inventoryItems`);

    // get a random airline
    const airlineItems = await axios.get(`${urlsConfig.airline}/inventoryItems`);

    //get a random auto
    const autoItems = await axios.get(`${urlsConfig.auto}/inventoryItems`);

    //get a random user
    obj.users = `${urlsConfig.user}/users`;
    const users = await axios.get(`${urlsConfig.user}/users`);

    const randomUser = sample(users);
    const randomAuto = sample(autoItems);
    const randomAirline= sample(airlineItems);
    const randomHotel = sample(hotelItems);

    //TODO finish this

    //Save hotel reservation

    //Save airline reservation

    //Save hotel reservation

    //save the whole shabang
};