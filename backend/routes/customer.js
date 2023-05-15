const express = require("express");
const router = express.Router();

const { getCustomers, getCustomerId, addOrders, deleteOrders } = require("../controllers/customer");

router.route("/").get(getCustomers);
router.route("/:id").get(getCustomerId);
router.route("/order").post(addOrders).delete(deleteOrders);
module.exports = router;
