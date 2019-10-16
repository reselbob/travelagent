const {getInventoryItem} =  require('../datastore');
//const uuidv4 = require('uuid/v4');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const vendors = ['ENTERPRISE', 'NATIONAL', 'AVIS', 'BUDGET', 'DOLLAR'];

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
    const endDate =  incrementDate(startDate, daysToAdd);
    const reservation = {};
    reservation.auto = sample(await autos);
    reservation.checkIn = startDate;
    reservation.checkOut = endDate;
    reservation.price = random(100) * daysToAdd;

};

const seedAutoInventory = async () => {
    for(let i = 0; i< vendors.length; i++){
        autos.forEach( async auto =>{
            const item = await getInventoryItem();
            item.vendor = vendors[i];
            item.auto = auto;
            console.log(item);
            await item.save();
        });

    }
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
//seed();
seedAutoInventory();

module.exports = {seed,createReservation,seedAutoInventory};