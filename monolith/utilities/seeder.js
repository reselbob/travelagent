/*
The purpose of this file is to seed Travel Agent with data
 */
'use strict';
const Airline = require('../airline');
const Hotel = require('../hotel');
const Auto = require('../auto');
const Reservation = require('../reservations');
const Users = require('../users');
const faker = require('faker');
const uuidv4 = require('uuid/v4');
const Authentication = require('../authentication/model');

const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const createUser = () => {
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.password = uuidv4();
    user.userName = `${user.lastName.substring(0,3)}${user.firstName.substring(0,3)}`;
    user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
    user.phone = faker.phone.phoneNumber();
    return user;
};
const createReservation = async () => {
    const startDate = new Date();
    const daysToAdd = random(15);
    const endDate = incrementDate(startDate,daysToAdd);

    const airline = new Airline();
    const air = airline.getDataModelSync();
    air.vendor = sample(await airline.getInventoryItems());
    air.flightNumber = random(5000);
    air.departure = startDate;
    air.return = endDate;
    air.fare = random(300) + 100;

    const hotel = new Hotel();
    const h = hotel.getDataModelSync();
    h.vendor = sample(await hotel.getInventoryItems());
    h.checkIn = startDate;
    h.checkOut = endDate;
    h.price = (random(100) + 100) * daysToAdd;

    const auto = new Auto();
    const a = auto.getDataModelSync();
    a.vendor = sample(await auto.getInventoryItems());
    a.checkIn = startDate;
    a.checkOut = endDate;
    a.price = random(100) * daysToAdd;

    const res = new Reservation().getDataModelSync();
    res.id = uuidv4();
    res.airline = air;
    res.hotel = h;
    res.auto = a;
    res.createDate = new Date();

    return res;
};

const seed = async () => {

    //create 20 users
    const numOfUsers = 20;
    const users = new Users();
    const authentication  = new Authentication();
    for(let i = 0; i < numOfUsers; i++){
        const user = createUser();
        const pwd = user.password;
        delete user.password;
        await users.setItem(user);
        user.password = pwd;
        await authentication.setItem(user);
    };

    const userList = await users.getItems();
    //create 100 reservations
    const numOfReservations = 100;
    const reservations = new Reservation();
    for(let i = 0; i < numOfReservations; i++){
        const reservation = await createReservation();
        reservation.user = sample(userList);
        await reservations.setItem(reservation);
    }

    const userCount = await users.getItems();
    const reservationList =  await reservations.getItems();
    console.log({reservationListCount: reservationList.length, userCount:userCount.length})
};
//fire it off here
seed();

module.exports = {seed,createUser,createReservation};