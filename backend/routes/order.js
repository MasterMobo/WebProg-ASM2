// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

const express = require("express");
const router = express.Router();

const { getOrders, getOrderId, getOrdersHub } = require("../controllers/order");

router.route("/").get(getOrders);
router.route("/:id").get(getOrderId);
router.route("/hub/:hubId").get(getOrdersHub);

module.exports = router;
