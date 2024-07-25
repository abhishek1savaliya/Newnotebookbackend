const mongoose = require('mongoose');
require('dotenv').config()

const connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DATABASE CONNECTED SUCCESSFULLY.")
}

module.exports = connectToMongo;
