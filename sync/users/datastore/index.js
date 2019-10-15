const mongoose = require('mongoose');
const User = require('./user');

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');


const getUser = async (id) =>{
    console.log(id);
    const user  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            if(!id)return new User();
            return User.findById(id);
        })
    return user;
};


const getUsers = async () =>{
    const users  = await mongoose.connect(process.env.MONGODB_URL,moption)
        .then (result => {
            return User.find({});
        })
    return users;
};


module.exports = {getUser, getUsers};

