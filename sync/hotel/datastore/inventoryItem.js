const mongoose = require('mongoose');
const inventoryItem = mongoose.Schema({
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
    created: {
        type: Date,
        default: Date.now
    }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItem);

module.exports = InventoryItem;