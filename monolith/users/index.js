const {getItems,getItemSync, setItem} = require('../utilities');
const path = require('path');
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
        item.id = uuidv4();
        item.createDate = new Date();
        let errs = [];
        for(let prop in item) {
            if(!item[prop])errs.push(prop)
        }
        if(errs.length > 0) throw new Error({message: 'Missing required properties', properties:errs})

        const filespec = path.join(__dirname, 'data.json');
        return await setItem(filespec, item);
    }

    getDataHolderSync(){
        const obj = {};
        obj.id;
        obj.firstName;
        obj.lastName;
        obj.email;
        obj.phone;
        obj.createDate;

        return obj;
    };
}
module.exports = Users;