const uuidv4 = require('uuid/v4');
const path = require('path');
const Base = require('../base');

class Reservations extends Base{

    async getItem(id) {
        const filespec = path.join(__dirname, 'data.json');
        const result =  await super.getItem(id,filespec);
        return result;
    }

    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return super.getItems(filespec);
    }

    async setItem(item) {
        item.id = uuidv4();
        item.airline.id = uuidv4();
        item.hotel.id = uuidv4();
        item.auto.id = uuidv4();
        const model = this.getDataModelSync()
        const filespec = path.join(__dirname, 'data.json');
        const result =  await super.setItem(item,filespec,model);

        return result;
    }

    async getBestDeal(){
        return await super.getBestDeal('ALL');
    }

    getDataModelSync(){
        const obj = {};
        obj.user;
        obj.airline;
        obj.hotel;
        obj.auto;

        return obj;
    };
}
module.exports = Reservations;