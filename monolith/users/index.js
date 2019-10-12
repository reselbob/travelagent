const {getItems,getItemSync, setItem, validateItemSync} = require('../utilities');
const path = require('path');
const {cryptPassword, comparePassword} = require('../authentication');
const uuidv4 = require('uuid/v4');

class Users {
    constructor(){
        return this;
    }
    async getItem(id) {
        const arr = await this.getItems();
        return getItemSync(arr,id);
    }

    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return getItems(filespec);
    }

    async setItem(item) {
        const model = this.getDataModelSync();
        validateItemSync(item, model);
        const filespec = path.join(__dirname, 'data.json');
        return await setItem(filespec, item);
    }

    getDataModelSync(){
        const obj = {};
        obj.userName;
        obj.firstName;
        obj.lastName;
        obj.email;
        obj.phone;
        return obj;
    };
}
module.exports = Users;