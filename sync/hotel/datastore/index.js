const mongoose = require('mongoose');
const InventoryItem = require('./inventoryItem');
const Reservation = require('./reservation');

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

const getInventoryItem = async (id) =>{
    console.log(id);
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            if(!id)return new InventoryItem();
            return InventoryItem.findById(id);
        })
    return item;
};

const getInventoryItems = async () =>{
    const items  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return InventoryItem.find({});
        })
    return items;
};

const getReservation = async (id) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            if(!id)return new Reservation();
            return Reservation.findById(id);
        });
    return item;
};

const getReservations = async () =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return Reservation.find({});
        });
    return item;
};

module.exports = {getInventoryItem, getInventoryItems,getReservation,getReservations};

