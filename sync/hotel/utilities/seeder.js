const faker = require('faker');

const sample = (items) => {
    return items[Math.floor(Math.random()*items.length)]
};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};


const vendors = ['HILTON', 'BW', 'W', 'SHERATON', 'MOTEl6', 'RAMADA'];
const createInventoryItem = () => {
    const obj = {
        property: {
            address_1: faker.address.streetAddress(),
            address_2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            state_province: faker.address.stateAbbr(),
            postal_code: faker.address.zipCode(),
            country: 'USA',
            phone: faker.phone.phoneNumber()
        },
        vendor: sample(vendors)
    }
    return obj;
};

module.exports = {createInventoryItem};