const mongoose = require("mongoose");

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("Connected to DB");
};

module.exports = connectDB;
