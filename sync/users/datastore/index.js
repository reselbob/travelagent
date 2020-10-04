const mongoose = require('mongoose');
const User = require('./user');

const service = 'users';

const moption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

if(!process.env.MONGODB_URL)throw new Error('The required environment variable, MONGODB_URL does not exist or has no value');

//This code appends the database name on the MongoDB URL, thus
//indicating the MongoDB database where seeding data is to be sent
let db_url = process.env.MONGODB_URL
if(process.env.SEEDING ) db_url = `${process.env.MONGODB_URL}/${service}`

console.log({service: service, url: db_url})

const getUser = async (id) =>{
    console.log(id);
    const user  = await mongoose.connect(db_url,moption)
        .then (result => {
            if(!id)return new User();
            return User.findById(id).lean();
        })
    return user;
};


const getUsers = async () =>{
    const users  = await mongoose.connect(db_url,moption)
        .then (result => {
            return User.find({}).lean();
        })
    return users;
};


module.exports = {getUser, getUsers};

