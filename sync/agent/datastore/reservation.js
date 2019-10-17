const mongoose = require('mongoose');
const reservation = mongoose.Schema({
    user:{
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
    },
    airline:{},
    auto: {},
    hotel: {},
    created: {
        type: Date,
        default: Date.now
    }
});

const Reservation = mongoose.model('Reservation', reservation);

module.exports = Reservation;