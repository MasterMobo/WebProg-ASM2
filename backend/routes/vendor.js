// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

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
