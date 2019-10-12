const {getItems,getItemSync, setItem} = require('../utilities');
const path = require('path');
const uuidv4 = require('uuid/v4');

class Hotel {
    constructor(){
        return this;
    }
    async getItem(name) {
        const arr = await this.getItems();
        return getItemSync(arr,name);

    }

    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return getItems(filespec);
    }
    getDataHolderSync(){
        const obj = {};
        obj.id;
        obj.vendor;
        obj.checkIn;
        obj.checkOut;
        obj.price;

        return obj;
    };
}
module.exports = Hotel;
