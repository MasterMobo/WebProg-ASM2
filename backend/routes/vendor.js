const express = require("express");
const {
    getVendorProducts,
    addProduct,
    deleteProduct,
    updateProduct,
} = require("../controllers/vendor");
const router = express.Router();

const upload = require("../middlewares/cloudinaryUpload");

router
    .route("/product")
    .get(getVendorProducts)
    .post(upload.single("image"), addProduct);
router.route("/product/:id").delete(deleteProduct).patch(updateProduct);

module.exports = router;
