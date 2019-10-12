const path = require('path');
const Base = require('../base');

class Users extends Base{

    async getItems() {
        const filespec = path.join(__dirname, 'data.json');
        return super.getItems(filespec);
    }

    async setItem(item) {
        const model = this.getDataModelSync();
        super.validateItemSync(item, model);
        const filespec = path.join(__dirname, 'data.json');
        return await super.setItem(item,filespec, model);
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