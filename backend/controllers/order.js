const Order = require("../models/order");

const getOrders = async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json({ orders });
};

const getOrderId = async (req, res) => {
    const order = await Order.findById(req.params.id);
        
    if (!order) {
        throw new NotFoundError("Order not found");
    }
    return res.status(200).json({ order });
};

const addOrder = async (req, res) => {
    const order = await Order.create(req.body);
    res.status(201).json({ order });
};

const deleteOrder = async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
        
    if (!order) {
        throw new NotFoundError("Order not found");
    }
    return res.status(200).json({ order });
};

module.exports = { getOrders, getOrderId, addOrder, deleteOrder };
