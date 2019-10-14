const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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