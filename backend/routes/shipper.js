const express = require("express");
const router = express.Router();
const { getShippers, getShipperId, updateOrder } = require("../controllers/shipper");

router.route("/").get(getShippers);
router.route("/:id").get(getShipperId);
router.route("/order/:id").patch(updateOrder);

module.exports = router;
