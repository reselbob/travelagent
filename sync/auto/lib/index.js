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
    deal.auto = {make: data.auto.make, model: data.auto.model, year: data.auto.year};
    deal.vendor = data.vendor;
    deal.checkIn = startDate;
    deal.checkOut = endDate;
    deal.price = random(50) * daysToAdd;
    return deal;
};

module.exports = {getBestDeal};




