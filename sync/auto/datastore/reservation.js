const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    auto: {
        make: String,
        model: String,
        year: Date,
        plate: String
    },
    vendor: String,
    checkIn: Date,
    checkOut: Date,
    price: mongoose.Decimal128,
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservation);

module.exports = Reservation;