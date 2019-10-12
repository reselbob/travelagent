const {getItems, getItemSync, setItem} = require('../../utilities');
const { cryptPassword,comparePassword,createToken} = require('../authenticationHelper');
const path = require('path');


const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

class Authentication {
    constructor(){
        return this;
    }
    async getItem(id) {
        const arr = await this.getItems();
        return getItemSync(arr,id);
    }

    getExpirationDays() {
        const days = process.env.TRAVEL_AGENT_TOKE_EXPIRATION_DAYS || 1;
        return days
    }


    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return getItems(filespec);
    }

    async setItem(item) {
        let hash;
        try {
            hash = await cryptPassword(item.password);
        } catch (e) {
            console.error(e);
        }
        delete item.password;
        item.encryptedPassword =  hash;
        item.jwtToken = createToken(item);
        item.expireDate = incrementDate(new Date(), this.getExpirationDays());

        const filespec = path.join(__dirname, 'data.json');
        const model = this.getDataModelSync();
        const result =  await setItem(filespec, item, model);
        return result;
    }

    getDataModelSync(){
        const obj = {};
        obj.userName;
        obj.encryptedPassword;
        obj.firstName;
        obj.lastName;
        obj.email;
        obj.phone;
        obj.jwtToken;
        obj.expireDate;

        return obj;
    };
}
module.exports = Authentication;