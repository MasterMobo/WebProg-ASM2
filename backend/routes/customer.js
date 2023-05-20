// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const express = require("express");
const router = express.Router();

const {
    getCustomers,
    getCustomerId,
    getCustomerOrders,
    addOrders,
    deleteOrders,
} = require("../controllers/customer");

router.route("/order").post(addOrders).get(getCustomerOrders);
// router.route("/order/:id").delete(deleteOrders);
router.route("/").get(getCustomers);
router.route("/:id").get(getCustomerId);
module.exports = router;
