const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const mongoose = require("mongoose");

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("Connected to DB");
};
const start = async () => {
    await connectDB(process.env.MONGO_URI);
}

start();

const Customer = require("../models/customer");
const Order = require("../models/order");
const Product = require("../models/product");
const Vendor = require("../models/vendor");
const DistributionHub = require("../models/distributionHub");

const cleansedb = async () => {
    await Customer.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Vendor.deleteMany({});
    await DistributionHub.deleteMany({});
    console.log("Cleaned DB");
}

const populateDB = async () => {

}
