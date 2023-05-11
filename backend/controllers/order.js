const order = require("../models/order");


const getOrders = async (req, res) => {
    const orders = await order.find({});
    res.status(200).json({ orders });
}

const getOrderId = async (req, res) => {
    const order = await order.findById(req.params.id);
    res.status(200).json({ order });
}

const addOrder = async (req, res) => {
    const order = await order.create(req.body);
    res.status(201).json({ order });
}

const deleteOrder = async (req, res) => {
    const order = await order.findByIdAndDelete(req.params.id);
    res.status(200).json({ order });
}

module.exports = {getOrders, getOrderId, addOrder, deleteOrder}