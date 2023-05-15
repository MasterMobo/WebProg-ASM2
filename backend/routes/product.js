const express = require("express");
const router = express.Router();

const { getProducts, getProductId } = require("../controllers/product");

router.route("/").get(getProducts);
router.route("/:id").get(getProductId);

module.exports = router;
