const faker = require('faker');
const sample = (items) => {return items[Math.floor(Math.random()*items.length)];};
const random = (max) => {return Math.floor(Math.random()* max)};

const incrementDate = (startDate, daysToAdd) => {
    const newdate = new Date();
    newdate.setDate(startDate.getDate() + daysToAdd);
    return newdate;
};

const startDate = new Date();
const daysToAdd = random(15);
const flightDate = incrementDate(startDate,daysToAdd);



const getBestDeal = async() => {
    const airline = sample(['DELTA', 'UA', 'FRONTIER', 'SPIRIT','LUFTHANSA','RYANAIR']);
    const from = sample(['LAX', 'SFO', 'SJC', 'ANC','SEA','SAN']);
    const to = sample(['LGA', 'JFK', 'PHL', 'BOS','EWA','DCA']);
    const deal = {
        flightNumber: random(1000),
        from,
        to,
        airline,
        departure:  flightDate,
        arrival:  flightDate,
        price:  100 + random(200),
    };

    return deal;
};

module.exports = {getBestDeal}




