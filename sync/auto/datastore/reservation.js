const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    user:{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true}
    },
    auto: {
        make: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Date, required: true},
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