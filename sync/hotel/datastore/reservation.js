const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    user:{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
    },
    property: {
        address_1: {type: String, required: true},
        address_2: {type: String, required: true},
        city: {type: String, required: true},
        state_province: {type: String, required: true},
        postal_code: {type: String, required: true},
        country: {type: String, required: true},
        phone: {type: String, required: true},
    },
    vendor: {type: String, required: true},
    checkIn:  {type: Date, required: true},
    checkOut:  {type: Date, required: true},
    price:  {type: mongoose.Decimal128, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservation);

module.exports = Reservation;