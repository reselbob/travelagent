const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    airline: {type: String, required: true},
    flightNumber: {type: Number, required: true},
    airport: {type: String, required: true},
    destination: {type: String, required: true},
    vendor: {type: String, required: true},
    departure:  {type: Date, required: true},
    arrival:  {type: Date, required: true},
    price:  {type: mongoose.Decimal128, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservation);

module.exports = Reservation;