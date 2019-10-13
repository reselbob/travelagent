const path = require('path');
const Base = require('../base');
class Hotel extends Base{
    getInventoryItems() {
        const filespec = path.join(__dirname, 'inventory.json');
        return super.getItems(filespec);
    }

    async getBestDeal(){
        return await super.getBestDeal('HOTEL');
    }

    getDataModelSync() {
        const obj = {};
        obj.vendor;
        obj.checkIn;
        obj.checkOut;
        obj.price;

        return obj;
    };
}

module.exports = Hotel;
