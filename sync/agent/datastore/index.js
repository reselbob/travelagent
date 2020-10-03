const mongoose = require('mongoose');
const Reservation = require('./reservation');

const service = 'agent';

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

//This code appends the database name on the MongoDB URL, thus
//indicating the MongoDB database where seeding data is to be sent
let db_url = process.env.MONGODB_URL
if(process.env.SEEDING ) db_url = `${process.env.MONGODB_URL}/${service}`

console.log({service,db_url })

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
            return Reservation.find({}).lean();;
        });
    return item;
};

const setReservations = async (data) =>{
    const item  = await mongoose.connect(db_url,moption)
        .then (result => {
            return getReservation()
        })
        .then(reservation => {
            reservation.user = data.user;
            reservation.airline = data.airline;
            reservation.hotel = data.hotel;
            reservation.auto = data.auto;
            return reservation.save();
        });
    return item;
};

module.exports = {getReservation, getReservations};

