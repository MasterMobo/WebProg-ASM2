const express = require("express");
const router = express.Router();

const { getOrders, getOrderId, getOrdersHub } = require("../controllers/order");

router.route("/").get(getOrders);
router.route("/:id").get(getOrderId);
router.route("/hub/:hubId").get(getOrdersHub);

module.exports = router;
