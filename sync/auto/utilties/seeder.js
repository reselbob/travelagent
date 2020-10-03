const {getInventoryItem, getReservation, getInventoryItems, getReservations} = require('../datastore');
const faker = require('faker');
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

const vendors = ['ENTERPRISE', 'NATIONAL', 'AVIS', 'BUDGET', 'DOLLAR'];

const getRandomUser = async () => {
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
    user.phone = faker.phone.phoneNumber();
    user.id = uuidv4();
    return user;
};
const autos = [
    {
        make: 'Dodge',
        model: 'Charger',
        year: '2019',
    },
    {
        make: 'Chevrolet',
        model: 'Volt',
        year: '2019',
    },
    {
        make: 'BMW',
        model: '3301',
        year: '2018',
    },
    {
        make: 'Jeep',
        model: 'Wrangler',
        year: '2018',
    },
    {
        make: 'Audi',
        model: '5000',
        year: '2017',
    }
];
const createReservation = async () => {
    const startDate = new Date();
    const daysToAdd = random(7);
    const endDate = incrementDate(startDate, daysToAdd);
    const reservation = {};
    reservation.auto = sample(await autos);
    reservation.vendor = sample(vendors);
    reservation.checkIn = startDate;
    reservation.checkOut = endDate;
    reservation.price = random(100) * daysToAdd;
    return reservation;
};

const seedInventoryItems = async () => {
    const existItems = await getInventoryItems();
    if(existItems.length >0) return existItems;
    const arr = [];
    for(let i = 0; i< vendors.length; i++){
        for(let j = 0; j < autos.length; j++){
            const item = await getInventoryItem();
            item.vendor = vendors[i];
            item.auto = autos[j];
            console.log({message: 'Saving Auto Inventory', item});
            const result = await item.save();
            console.log({message: 'Saved Auto Inventory', item});
            arr.push(result);
        }
    }
    if(arr.length > 0) return arr;
};

const seedReservations = async () => {
    const existingReservations = await getReservations();
    if(existingReservations) return existingReservations;
    //create 20 reservations
    const numOfReservations = 20;
    const arr = [];
    for (let i = 0; i < numOfReservations; i++) {
        const reservation = await getReservation();
        const res = await createReservation();
        reservation.user = await getRandomUser();
        reservation.auto = res.auto;
        reservation.vendor = res.vendor;
        reservation.checkIn = res.checkIn;
        reservation.checkOut = res.checkOut;
        reservation.price = res.price;
        console.log({message: 'Saving Reservation', reservation: res});
        arr.push(reservation.save());
    }
    console.log({reservationListCount: arr.length});
    const result = await Promise.all(arr);
    return result;
};
module.exports = {seedReservations, seedInventoryItems};