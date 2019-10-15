const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    user:{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
    },
    _id: mongoose.Schema.Types.ObjectId,
    airline: {type: String, required: true},
    flightNumber: {type: Number, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
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