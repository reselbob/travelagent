const {getItems,getItemSync, setItem} = require('../utilities');
const path = require('path');
const uuidv4 = require('uuid/v4');

class Reservations {
    constructor(){
        return this;
    }
    async getItem(id) {
        const arr = await this.getItems();
        const result =  getItemSync(arr,id);
        return result;
    }

    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return getItems(filespec);
    }

    async setItem(item) {
        item.id = uuidv4();
        item.airline.id = uuidv4();
        item.hotel.id = uuidv4();
        item.auto.id = uuidv4();
        const filespec = path.join(__dirname, 'data.json');
        const result =  await setItem(filespec, item);

        return result;
    }

    getDataHolderSync(){
        const obj = {};
        obj.id;
        obj.user;
        obj.airline;
        obj.hotel;
        obj.auto;
        obj.createDate;

        return obj;
    };
}
module.exports = Reservations;