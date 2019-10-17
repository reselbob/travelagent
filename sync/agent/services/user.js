const axios = require('axios');

const url = process.env.USER_SERVICE_URL;

const getUsers = async ()=> { return await axios.get(`${url}/users`).then(res => {return res.data}).then(res => {return res.data})};
const getUser = async (id)=>  { return await axios.get(`${url}/users/${id}`).then(res => {return res.data}).then(res => {return res.data})};
const setUser = async (data)=>  { return await axios.post(`${url}/users`, data).then(res => {return res.data}).then(res => {return res.data})};

module.exports = {getUsers, getUser, setUser};