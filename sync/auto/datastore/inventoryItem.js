const mongoose = require('mongoose');
const inventoryItem = mongoose.Schema({
    auto: {
        make: {type: String, required: true},
        model: {type: String, required: true},
        year: {type: Date, required: true},
    },
    vendor: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItem);

module.exports = InventoryItem;