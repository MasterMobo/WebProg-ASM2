const Customer = require("../models/customer");
const Vendor = require("../models/vendor");

const { userNameCheck, loginRole, registerRole } = require("./utils");
const { BadRequestError } = require("../errors/index");

const login = async (req, res) => {
    const { role } = req.body;

    switch (role) {
        case "vendor":
            await loginRole(req, res, Vendor);
            return;
        case "customer":
            await loginRole(req, res, Customer);
            return;
        case "shipper":
            // await loginRole(req, res, Shipper);
            return;
    }

    throw new BadRequestError("Invalid role");
};

const register = async (req, res) => {
    const { role, username } = req.body;

    const usernameValid = await userNameCheck(username);
    if (usernameValid === false) {
        throw new BadRequestError("Username already taken");
    }

    switch (role) {
        case "vendor":
            await registerRole(req, res, Vendor);
            return;
        case "customer":
            await registerRole(req, res, Customer);
            return;
        case "shipper":
            // await registerRole(req, res, Shipper);
            return;
    }

    throw new BadRequestError("Invalid role");
};

module.exports = { login, register };
