const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const Shipper = require("../models/shipper");

const userNameCheck = async (username) => {
    // Check if username is already taken in the whole system
    const customerExists = await Customer.findOne({ username });
    const vendorExists = await Vendor.findOne({ username });
    const shipperExists = await Shipper.findOne({ username });
    if (customerExists || vendorExists || shipperExists) {
        return false;
    }
};

module.exports = { userNameCheck };
