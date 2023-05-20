// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("Connected to DB");
};
const start = async () => {
    await connectDB(process.env.MONGO_URI);
    // await cleansedb();
    // await populateDB();
};

start();

const Customer = require("../models/customer");
const Order = require("../models/order");
const Product = require("../models/product");
const Vendor = require("../models/vendor");
const DistributionHub = require("../models/distributionHub");
const Shipper = require("../models/shipper");

const cleansedb = async () => {
    await Customer.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Vendor.deleteMany({});
    await DistributionHub.deleteMany({});
    await Shipper.deleteMany({});
    console.log("Cleaned DB");
};

const populateDB = async () => {
    await DistributionHub.insertMany([
        {
            name: "Ho Chi Minh",
            address: "3 Nguyen Tat Thanh, Phuong 12, Ward 4, Ho Chi Minh",
        },
        {
            name: "Hanoi",
            address: "838 Bach Dang, Thanh Long, Hai Ba Trung, Ha Noi",
        },
        {
            name: "Da Nang",
            address: "26 Bach Dang, Hai Chau, Da Nang",
        },
    ]);
    console.log("Populated DB");
};
