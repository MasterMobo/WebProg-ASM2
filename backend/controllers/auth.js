const Customer = require("../models/customer");

const { userNameCheck, loginRole, registerRole } = require("./utils");

const login = async (req, res) => {
    const { role } = req.body;

    switch (role) {
        case "vendor":
            // await loginRole(Vendor);
            return;
        case "customer":
            await loginRole(req, res, Customer);
            return;
        case "shipper":
            // check database
            return;
    }

    return res.status(400).json({ message: "Invalid role" });
};

const register = async (req, res) => {
    const { role, username } = req.body;

    const usernameValid = await userNameCheck(username);
    if (usernameValid === false) {
        return res.status(400).json({ message: "Username already taken" });
    }

    switch (role) {
        case "vendor":
            await registerVendor(req, res);
            return;
        case "customer":
            req.body = {};
            await registerCustomer(req, res);
            return;
        case "shipper":
            await registerShipper(req, res);
            return;
    }

    return res.status(400).json({ message: "Invalid role" });
};

module.exports = { login, register };
