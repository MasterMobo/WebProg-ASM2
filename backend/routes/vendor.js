const express = require("express");
const {getVendorProducts, addProduct, deleteProduct, updateProduct} = require("../controllers/vendor");
const router = express.Router();

router.route('/product').get(getVendorProducts).post(addProduct);
router.route('/product/:id').delete(deleteProduct).patch(updateProduct);

module.exports = router;
