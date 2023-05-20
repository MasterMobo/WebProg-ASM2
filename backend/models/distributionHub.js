// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const mongoose = require("mongoose");
const DistributionHubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
    address: {
        type: String,
        required: [true, "Please provide address"],
        unique: true,
        minlength: 5,
        maxlength: 100,
    },
});

module.exports = mongoose.model("DistributionHub", DistributionHubSchema);
