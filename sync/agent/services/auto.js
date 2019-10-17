const axios = require('axios');

const url = process.env.AUTO_SERVICE_URL;

console.log(url);
const getBestDeal = async ()=> { return await axios.get(`${url}/bestDeal`).then(res => {return res.data})};
const getReservations = async ()=> { return await axios.get(`${url}/reservations`).then(res => {return res.data})};
const getReservation = async (id)=>  { return await axios.get(`${url}/reservations/${id}`).then(res => {return res.data})};
const setReservation = async (data)=>  { return await axios.post(`${url}/reservations`, data).then(res => {return res.data})};

module.exports = {getReservations, getReservation, setReservation,getBestDeal};