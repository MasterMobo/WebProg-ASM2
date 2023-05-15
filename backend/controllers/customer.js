const Customer =require ("../models/customer");
const Order = require("../models/order");

const { NotFoundError, UnauthorizedError } = require("../errors/index");

const getCustomers = async (req, res) => {
    const customers =await Customer.find({});
    const customersWithoutPassword = customers.map((customer) => {
        const { password, ...customerWithoutPassword } = customer._doc;
        return customerWithoutPassword;
    });
    return res.status(200).json({ customersWithoutPassword});
    }

const getCustomerId = async (req, res) => {
    const customer = await Customer.findById(req.params.id);
        
    if (!customer) {
        throw new NotFoundError("Customer not found");
    }
    const { password, ...customerWithoutPassword } = customer._doc;
    return res.status(200).json({ customerWithoutPassword });
    }

const addOrders = async (req, res) => {
    const {userID, role} = req.user;
    
    if (role !== "customer") {
        throw new UnauthorizedError("You are not authorized to add orders");
    }

    const order = await Order.create({...req.body, customerID: userID});
    return res.status(201).json({ order });
}

const deleteOrders = async (req, res) => {
    const {userID, role} = req.user;
    
    if (role !== "customer") {
        throw new UnauthorizedError("You are not authorized to delete orders");
    }
    const order = await Order.findOneAndDelete({ _id: req.params.id, customerID: userID });
    return res.status(200).json({ order });
}
module.exports = { getCustomers, getCustomerId, addOrders, deleteOrders };