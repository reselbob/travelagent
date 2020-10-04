const mongoose = require('mongoose');
const InventoryItem = require('./inventoryItem');
const Reservation = require('./reservation');

const service = 'airline';

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');


//This code appends the database name on the MongoDB URL, thus
//indicating the MongoDB database where seeding data is to be sent
let db_url = process.env.MONGODB_URL
if(process.env.SEEDING ) db_url = `${process.env.MONGODB_URL}/${service}`

console.log({service: service, url: db_url})

const getInventoryItem = async (id) =>{
    console.log(id);
    const item  = await mongoose.connect(db_url,moption)
        .then (result => {
            if(!id)return new InventoryItem();
            return InventoryItem.findById(id);
        })
    return item;
};

const getInventoryItems = async () =>{
    const items  = await mongoose.connect(db_url,moption)
        .then (result => {
            return InventoryItem.find({}).lean();
        })
    return items;
};

const getReservation = async (id) =>{
    const item  = await mongoose.connect(db_url,moption)
        .then (result => {
            if(!id)return new Reservation();
            return Reservation.findById(id).lean();
        });
    return item;
};

const getReservations = async () =>{
    const item  = await mongoose.connect(db_url,moption)
        .then (result => {
            return Reservation.find({}).lean();
        });
    return item;
};

module.exports = {getInventoryItem, getInventoryItems, getReservation, getReservations};

