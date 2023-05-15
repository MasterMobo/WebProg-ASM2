const Order = require("../models/order");

const getOrders = async (req, res) => {
    // Get all orders
    const orders = await Order.find({});
    return res.status(200).json({ orders });
};

const getOrdersHub = async (req, res) => {
    // Get all orders from a specific hub
    const orders = await Order.find({ distributionHubId: req.params.hubId });
    return res.status(200).json({ orders });
};

const getOrderId = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    return res.status(200).json({ order });
};

module.exports = { getOrders, getOrderId, getOrdersHub };
