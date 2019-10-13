const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');

class Base {
    async getItems(fileSpec){
        const readFile = util.promisify(fs.readFile);
        const result = await readFile(fileSpec, "utf8").then(data => {
            if(data) return JSON.parse(data);
        });
        return result;
    };

    async getItem(id, fileSpec){
        const arr = await this.getItems(fileSpec);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
    };

    /*
    Validates that all the properties in the parameter,
    item have values. Otherwise an error is thrown.
     */
    validateItemSync(item, dataModel){
        let errs = [];
        for(let prop in dataModel) {
            if(!item[prop])errs.push(prop)
        }
        if(errs.length > 0) throw new Error({message: 'Missing required properties', properties:errs, item});
    };

    async setItem(item, fileSpec, model){
        item.id = uuidv4();
        item.createDate = new Date();
        this.validateItemSync(item, model);
        let items = await this.getItems(fileSpec);
        if(!Array.isArray(items)) items = new Array();
        items.push(item);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(fileSpec, JSON.stringify(items),"utf8")
            .then(() => {return item})
            .catch(err => {
                console.log(err);
            });
    };

    getDealTypesSync(){
        return ['AUTO', 'AIRLINE', 'HOTEL', 'ALL'];
    }

    async getBestDeal(dealType){
        const {createReservation} = require('../utilities/seeder');
        const reservation = await createReservation();
        delete reservation.user;
        const typ = dealType.toUpperCase();
        switch (typ) {
            case 'AUTO':
                return reservation.auto;
            case 'HOTEL':
                return reservation.hotel;
            case 'AIRLINE':
                return reservation.airline;
        }
        return reservation;

    }
}




module.exports = Base;