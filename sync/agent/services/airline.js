const axios = require('axios');

const url = process.env.AIRLINE_SERVICE_URL;
console.log(url);

const getBestDeal = async ()=> { return await axios.get(`${url}/bestDeal`)};
const getReservations = async ()=> { return await axios.get(`${url}/reservations`)};
const getReservation = async (id)=>  { return await axios.get(`${url}/reservations/${id}`)};
const setReservation = async (data)=>  { return await axios.post(`${url}/reservations`, data)};

module.exports = {getReservations, getReservation, setReservation,getBestDeal};