const express = require("express");
const router = express.Router();

const { getCustomers, getCustomerId } = require("../controllers/customer");

router.route("/").get(getCustomers);
router.route("/:id").get(getCustomerId);
module.exports = router;
