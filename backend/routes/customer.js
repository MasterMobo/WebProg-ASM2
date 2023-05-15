const express = require("express");
const router = express.Router();

const {
    getCustomers,
    getCustomerId,
    getCustomerOrders,
    addOrders,
    deleteOrders,
} = require("../controllers/customer");

router.route("/order").post(addOrders).get(getCustomerOrders);
// router.route("/order/:id").delete(deleteOrders);
router.route("/").get(getCustomers);
router.route("/:id").get(getCustomerId);
module.exports = router;
