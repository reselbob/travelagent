const mongoose = require('mongoose');
const Reservation = require('./reservation');

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

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

const setReservations = async (data) =>{
    const item  = await mongoose.connect(process.env.MONGODB_URL,moption)
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

