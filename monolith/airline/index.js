const path = require('path');
const Base = require('../base');

class Airline extends Base{
    getInventoryItems(){
        const filespec = path.join(__dirname, 'inventory.json');
        return super.getItems(filespec);
    }

    getBestDeal(){
        return super.getBestDeal('AIRLINE');
    }

   getDataModelSync() {
        const obj = {};
        obj.id;
        obj.vendor;
        obj.flightNumber;
        obj.departure;
        obj.return;
        obj.fare;

       return obj;
    };

}

module.exports = Airline;
