// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081
const Customer = require("../models/customer");
const Order = require("../models/order");

const { NotFoundError, UnauthorizedError } = require("../errors/index");

const getCustomers = async (req, res) => {
    // Get all customers
    const customers = await Customer.find({});
    const customersWithoutPassword = customers.map((customer) => {
        const { password, ...customerWithoutPassword } = customer._doc;
        return customerWithoutPassword;
    });
    return res.status(200).json({ customers: customersWithoutPassword });
};

const getCustomerId = async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        throw new NotFoundError("Customer not found");
    }
    const { password, ...customerWithoutPassword } = customer._doc;
    return res.status(200).json({ customer: customerWithoutPassword });
};

const getCustomerOrders = async (req, res) => {
    // Get all orders of a customer
    const { userID, role } = req.user;

    if (role !== "customer") {
        throw new UnauthorizedError("You are not a customer");
    }

    const orders = await Order.find({ customerID: userID });

    res.status(200).json({ orders });
};

const addOrders = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "customer") {
        throw new UnauthorizedError("You are not authorized to add orders");
    }

    const order = await Order.create({ ...req.body, customerID: userID });
    return res.status(201).json({ order });
};

const deleteOrders = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "customer") {
        throw new UnauthorizedError("You are not authorized to delete orders");
    }
    const order = await Order.findOneAndDelete({
        _id: req.params.id,
        customerID: userID,
    });

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    return res.status(200).json({ order });
};
module.exports = {
    getCustomers,
    getCustomerId,
    getCustomerOrders,
    addOrders,
    deleteOrders,
};
