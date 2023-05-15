const Shipper = require("../models/shipper");
const Order = require("../models/order");
const { NotFoundError,UnauthorizedError } = require("../errors/index");


const getShippers = async (req, res) => {
    const shippers = await Shipper.find({});
    const shippersWithoutPassword = shippers.map((shipper) => {
        const { password, ...shipperWithoutPassword } = shipper._doc;
        return shipperWithoutPassword;
    });
    res.status(200).json({ shippersWithoutPassword });
}

const getShipperId = async (req, res) => {
    const shipper = await Shipper.findById(req.params.id);

    if (!shipper) {
        throw new NotFoundError("Shipper not found");
    }
    const { password, ...shipperWithoutPassword } = shipper._doc;
    res.status(200).json({ shipperWithoutPassword });
}

const updateOrder = async (req, res) => {
    const {userID, role} = req.user;
    if (role !== "shipper") {
        throw new UnauthorizedError("You are not authorized to update orders");
    }
    const order = await Order.findOneAndUpdate({ _id: req.params.id }, {status: req.body.status}, { new: true });
    if (!order) {
        throw new NotFoundError("Order not found");
    }
    res.status(200).json({ order });
};

module.exports = { getShippers, getShipperId, updateOrder };