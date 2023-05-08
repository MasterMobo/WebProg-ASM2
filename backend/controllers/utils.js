const Customer = require("../models/customer");
const Vendor = require("../models/vendor");

const userNameCheck = async (username) => {
    // Check if username is already taken in the whole system
    const customerExists = await Customer.findOne({ username });
    const vendorExists = await Vendor.findOne({ username });
    if (customerExists || vendorExists) {
        return false;
    }
};

const registerRole = async (req, res, schema) => {
    const newUser = await schema.create(req.body);
    res.status(201).json({ newUser });
};

const loginRole = async (req, res, schema) => {
    const { username } = req.body;
    const foundUser = await schema.findOne({ username });
    if (!foundUser) {
        return res.status(404).json({ message: "Username not found" });
    }

    const { password } = req.body;
    const passwordMatch = await foundUser.comparePassword(password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({ message: "Login success" });
};

module.exports = { userNameCheck, loginRole, registerRole };
