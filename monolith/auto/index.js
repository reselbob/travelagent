const {getItems,getItemSync, setItem} = require('../utilities');
const path = require('path');
const uuidv4 = require('uuid/v4');

class Auto {
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

    async setItem(item) {
        item.id = uuid4();
        const filespec = path.join(__dirname, 'data.json');
        return await setItem(filespec, item);
    }

    getDataHolderSync(){
        const obj = {};
        obj.id;
        obj.vendor;
        obj.make;
        obj.model;
        obj.checkIn;
        obj.checkOut;
        obj.price

        return obj;
    };
}

module.exports = Auto;
