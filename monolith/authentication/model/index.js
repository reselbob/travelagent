const { cryptPassword,createToken} = require('../authenticationHelper');
const path = require('path');
const Base = require('../../base');

const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

class Authentication extends Base{
    async getItem(id) {
        const filespec = path.join(__dirname, 'data.json');
        return await super.getItem(id,filespec);
    }

    getExpirationDays() {
        const days = process.env.TRAVEL_AGENT_TOKE_EXPIRATION_DAYS || 1;
        return days
    }


    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return super.getItems(filespec);
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

        const model = this.getDataModelSync();
        const filespec = path.join(__dirname, 'data.json');
        const result =  await super.setItem(item,filespec,model);
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