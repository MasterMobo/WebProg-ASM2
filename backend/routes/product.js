const express = require("express");
const router = express.Router();

const {getProducts, getProductId, addProduct, deleteProduct} = require("../controllers/product");

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProductId).delete(deleteProduct);

module.exports = router;
