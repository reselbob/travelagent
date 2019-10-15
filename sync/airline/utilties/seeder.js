
const uuidv4 = require('uuid/v4');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};
const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};



const createReservation = async () => {
    const startDate = new Date();
    const daysToAdd = random(15);
    const endDate = incrementDate(startDate,daysToAdd);
};

const seed = async () => {
}
//fire it off here
seed();

