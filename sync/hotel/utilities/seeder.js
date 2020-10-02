const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const {getInventoryItem, getInventoryItems, getReservation} = require('../datastore');

const sample = (items) => {
    return items[Math.floor(Math.random()*items.length)]
};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const createReservation = async () => {
    const startDate = new Date();
    const daysToAdd = random(7);
    const endDate = incrementDate(startDate, daysToAdd);
    const reservation = {};
    reservation.checkIn = startDate;
    reservation.checkOut = endDate;
    reservation.price = (random(100) + 50) * daysToAdd;
    return reservation;
};

const getRandomUser = async () => {
    const user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = `${user.firstName}.${user.lastName}@${faker.internet.domainName()}`;
    user.phone = faker.phone.phoneNumber();
    user.id = uuidv4();
    return user;
};
const vendors = ['HILTON', 'BW', 'W', 'SHERATON', 'MOTEl6', 'RAMADA'];
const createInventoryItem = () => {
    const obj = {
        property: {
            address_1: faker.address.streetAddress(),
            address_2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state_province: faker.address.stateAbbr(),
            postal_code: faker.address.zipCode(),
            country: 'USA',
            phone: faker.phone.phoneNumber()
        },
        vendor: sample(vendors)
    }
    return obj;
};

const getReservationSeed = async (inventoryItems) => {
    const item = await sample((inventoryItems));
    const res = await createReservation();
    const reservation = await getReservation();
    reservation.user = await getRandomUser();
    reservation.vendor  = item.vendor;
    reservation.property = item.property;
    reservation.checkIn = res.checkIn;
    reservation.checkOut = res.checkOut;
    reservation.price = res.price;

    return reservation;
};
const seedReservations = async () => {
    const numberOfReservations = process.env.NUMBER_OF_RESERVATIONS || 10;
    let inventoryItems = await getInventoryItems();
    if(!inventoryItems){
        await seedInventoryItems();
        inventoryItems = await getInventoryItems();
    };
    const arr = [];
    for(let i = 0;i < numberOfReservations; i++){
        const reservation = await getReservationSeed(inventoryItems);
        console.log({message: 'Saving Hotel Reservation', reservation, createDate: new Date()});
        const result = await reservation.save();
        console.log({message: 'Saved Hotel Reservation', reservation, createDate: new Date()});
        arr.push(result);
    }
    if(arr.length > 0) return arr;
};


const seedInventoryItems = async () => {
    const arr = [];
    for(let i = 0; i< vendors.length; i++){
            const item = await getInventoryItem();
            const fake = createInventoryItem();
            item.vendor = vendors[i];
            item.property = fake.property;
            console.log({message: 'Saving Hotel Inventory Item', item, createDate: new Date()});
            const result = await item.save();
            console.log({message: 'Saved Hotel Inventory Item', createDate: new Date()});
            arr.push(result);
        }
    if(arr.length > 0) return arr;
};

module.exports = {createInventoryItem, seedInventoryItems, seedReservations};