const mongoose = require('mongoose');
require('dotenv').config()

const uri = process.env.DB_URI

const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri, () => {
        console.log("Connecting to MongoDB");
    })
}

module.exports = connectToMongo;
