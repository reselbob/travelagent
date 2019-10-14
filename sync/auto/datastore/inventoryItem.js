const mongoose = require('mongoose');
const inventoryItem = mongoose.Schema({
    auto: {
        make: String,
        model: String,
        year: Date,
        plate: String
    },
    vendor: String,
    created: {
        type: Date,
        default: Date.now
    }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItem);

module.exports = InventoryItem;