const mongoose = require('mongoose');
const inventoryItem = mongoose.Schema({
    airline: {type: String, required: true},
    created: {
        type: Date,
        default: Date.now
    }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItem);

module.exports = InventoryItem;