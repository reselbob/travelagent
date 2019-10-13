const path = require('path');
const Base = require('../base');
class Auto extends Base{
    getInventoryItems() {
        const filespec = path.join(__dirname, 'inventory.json');
        return super.getItems(filespec);
    }

    async getBestDeal(){
        return await super.getBestDeal('AUTO');
    }

    getDataModelSync() {
        const obj = {};
        obj.vendor;
        obj.make;
        obj.model;
        obj.checkIn;
        obj.checkOut;
        obj.price;

        return obj;
    };
}

module.exports = Auto;
