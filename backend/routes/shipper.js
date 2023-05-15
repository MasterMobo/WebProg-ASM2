const express = require("express");
const router = express.Router();
const {
    getShippers,
    getShipperId,
    updateOrder,
} = require("../controllers/shipper");

router.route("/").get(getShippers);
router.route("/order/:id").patch(updateOrder);
router.route("/:id").get(getShipperId);

module.exports = router;
