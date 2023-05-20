// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978482, s3979081

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
