const Customer = require("../models/customer");
const Vendor = require("../models/vendor");
const Shipper = require("../models/shipper");

const jwt = require("jsonwebtoken");

const { userNameCheck } = require("./utils");
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require("../errors/index");

const login = async (req, res) => {
    const { role, username, password } = req.body;
    switch (role) {
        case "vendor":
            await loginRole(req, res, Vendor);
            return;
        case "customer":
            await loginRole(req, res, Customer);
            return;
        case "shipper":
            await loginRole(req, res, Shipper);
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
            await registerRole(req, res, Shipper);
            return;
    }

    throw new BadRequestError("Invalid role");
};

const registerRole = async (req, res, model) => {
    const imageURL = req.file.path;
    const newUser = await model.create({
        ...req.body,
        profilePicURL: imageURL,
    });
    const { password, ...userWithoutPassword } = newUser._doc;
    return res.status(201).json({ user: userWithoutPassword });
};

const loginRole = async (req, res, model) => {
    const { username } = req.body;
    const foundUser = await model.findOne({ username });
    if (!foundUser) {
        throw new NotFoundError("Username not found");
    }

    const { password } = req.body;
    const passwordMatch = await foundUser.comparePassword(password);
    if (!passwordMatch) {
        throw new UnauthorizedError("Invalid password");
    }

    const token = jwt.sign(
        { userID: foundUser._id, role: foundUser.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );

    const { password: pass, ...userWithoutPassword } = foundUser._doc;

    return res
        .status(200)
        .json({ message: "Login success", token, user: userWithoutPassword });
};

module.exports = { login, register };
