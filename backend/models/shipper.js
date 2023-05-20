// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const ShipperSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "Please provide username"],
        unique: true,
        minlength: 8,
        maxlength: 15,
        match: /^[a-zA-Z0-9]+$/, // contains only letters (lower and upper case) and digits
    },
    password: {
        type: String,
        require: [true, "Please provide password"],
    },
    profilePicURL: {
        type: String,
        require: false,
        default: null,
    },
    distributionHubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DistributionHub",
        require: [true, "Please provide distribution hub id"],
    },
    role: {
        type: String,
        require: [true, "Please provide role"],
        enum: ["shipper"],
        default: "shipper",
    },
});

// Hash password before saving to database
ShipperSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
ShipperSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Shipper", ShipperSchema);
