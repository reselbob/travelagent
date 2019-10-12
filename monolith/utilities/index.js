const fs = require('fs');
const util = require('util');
const uuidv4 = require('uuid/v4');

const getItems = async (fileSpec) => {
    const readFile = util.promisify(fs.readFile);
    const result = await readFile(fileSpec, "utf8").then(data => {
        if(data) return JSON.parse(data);
    });
    return result;
};

const getItemSync = (arr, id) => {
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
const validateItemSync = (item, dataModel) => {
    let errs = [];
    for(let prop in dataModel) {
        if(!item[prop])errs.push(prop)
    }
    if(errs.length > 0) throw new Error({message: 'Missing required properties', properties:errs, item});
};

const setItem = async (fileSpec, item, dataModel) => {
    item.id = uuidv4();
    item.createDate = new Date();
    validateItemSync(item, dataModel);
    let items = await getItems(fileSpec);
    if(!Array.isArray(items)) items = new Array();
    items.push(item);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(fileSpec, JSON.stringify(items),"utf8")
        .then(result => {return item})
        .catch(err => {
            console.log(err);
        });
};


module.exports = {getItems,getItemSync, setItem, validateItemSync};


