// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const express = require("express");
const router = express.Router();

const { getProducts, getProductId } = require("../controllers/product");

router.route("/").get(getProducts);
router.route("/:id").get(getProductId);

module.exports = router;
