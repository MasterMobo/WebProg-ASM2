// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true,
        match: /^[a-zA-Z0-9]+$/, // contains only letters (lower and upper case) and digits
        minlength: 8,
        maxlength: 15,
    },
    password: {
        // Password will be hashed before saving to database
        type: String,
        required: [true, "Please provide password"],
    },

    profilePicURL: {
        type: String,
        required: false,
        default: null,
    },

    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 5,
        maxlength: 50,
    },

    address: {
        type: String,
        required: [true, "Please provide address"],
        minlength: 5,
        maxlength: 100,
    },
    role: {
        type: String,
        required: [true, "Please provide role"],
        enum: ["customer"],
        default: "customer",
    },
});

// Hash password before saving to database
CustomerSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
CustomerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Customer", CustomerSchema);
