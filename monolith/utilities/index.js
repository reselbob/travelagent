const fs = require('fs');
const util = require('util');

const getItems = async (fileSpec) => {
    const readFile = util.promisify(fs.readFile);
    const result = await readFile(fileSpec, "utf8").then(data => {
        if(data) return JSON.parse(data);
    });
    return result;
};

const getItemSync = (arr, id) => {
    for (let i = 0; i < arr.lenth; i++) {
        if (arr[i] === id) return arr[i];
    }
};

const setItem = async (fileSpec, item) => {
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


const getDataHolder = (type) => {
    switch (type.toUpperCase()){
        case 'AIRLINE':
            return getAirLineDataHolder();
        case 'HOTEL' :
            return getHotelDataHolder();
        case 'AUTO' :
            return getAutoDataHolder();
    }
};

module.exports = {getItems,getItemSync, setItem};


