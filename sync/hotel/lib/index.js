const {getInventoryItems} = require('../datastore');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};

const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const startDate = new Date();
const daysToAdd = random(15);
const endDate = incrementDate(startDate,daysToAdd);

const getBestDeal = async() => {
    const data = sample(await getInventoryItems());
    const deal = {};
    deal.property = {address_1: data.property.address_1,
        address_2: data.property.address_2,
        city: data.property.city,
        state_province: data.property.state_province,
        postal_code: data.property.postal_code,
        country: data.property.country,
        phone: data.property.phone,
    };
    deal.vendor = data.vendor;
    deal.checkIn = startDate;
    deal.checkOut = endDate;
    deal.price = (50 + random(100)) * daysToAdd;
    return deal;
};

module.exports = {getBestDeal};





