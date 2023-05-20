// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const mongoose = require("mongoose");

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("Connected to DB");
};

module.exports = connectDB;
