const axios = require('axios');

const url = 'http://'+ process.env['USER_SERVICE_URL'];

const getUsers = async ()=> { return await axios.get(`${url}/users`)};
const getUser = async (id)=>  { return await axios.get(`${url}/users/${id}`)};
const setUser = async (data)=>  { return await axios.post(`${url}/users`, data)};

module.exports = {getUsers, getUser, setUser};