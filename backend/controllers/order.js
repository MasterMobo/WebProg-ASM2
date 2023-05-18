const Order = require("../models/order");
const Customer = require("../models/customer");
const DistributionHub = require("../models/distributionHub");

const getOrders = async (req, res) => {
    // Get all orders
    const orders = await Order.find({});
    return res.status(200).json({ orders });
};

const getOrdersHub = async (req, res) => {
    // Get all orders from a specific hub
    let orders = await Order.find({ distributionHubId: req.params.hubId });
    orders = await Promise.all(
        orders.map(async (order) => {
            // // attach userName and distributionHubName to each order
            const user = await Customer.findById(order.customerID);

            const distributionHub = await DistributionHub.findById(
                order.distributionHubId
            );
            return {
                ...order._doc,
                customerName: user.name,
                distributionHubName: distributionHub.name,
            };
        })
    );

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
