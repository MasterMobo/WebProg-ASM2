const Shipper = require("../models/shipper");
const Order = require("../models/order");
const { NotFoundError, UnauthorizedError } = require("../errors/index");

const getShippers = async (req, res) => {
    const shippers = await Shipper.find({});
    const shippersWithoutPassword = shippers.map((shipper) => {
        const { password, ...shipperWithoutPassword } = shipper._doc;
        return shipperWithoutPassword;
    });
    return res.status(200).json({ shippers: shippersWithoutPassword });
};

const getShipperId = async (req, res) => {
    const shipper = await Shipper.findById(req.params.id);

    if (!shipper) {
        throw new NotFoundError("Shipper not found");
    }
    const { password, ...shipperWithoutPassword } = shipper._doc;
    return res.status(200).json({ shipper: shipperWithoutPassword });
};

const updateOrder = async (req, res) => {
    const { userID, role } = req.user;

    if (role !== "shipper") {
        throw new UnauthorizedError("You are not authorized to update orders");
    }

    // Shippers can only update order status
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    if (!order) {
        throw new NotFoundError("Order not found");
    }

    return res.status(200).json({ order });
};

module.exports = { getShippers, getShipperId, updateOrder };
