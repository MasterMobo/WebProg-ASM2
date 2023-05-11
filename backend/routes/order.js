const express = require("express");
const router = express.Router();

const {getOrders, getOrderId, addOrder, deleteOrder} = require("../controllers/order");

router.route("/").get(getOrders).post(addOrder);
router.route("/:id").get(getOrderId).delete(deleteOrder);

module.exports = router;
