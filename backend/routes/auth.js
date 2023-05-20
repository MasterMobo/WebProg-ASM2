// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Bui Dang Khoa, Tran Phan Trong Phuc
// ID: s3978282, s3979081

const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinaryUpload");

const { register, login } = require("../controllers/auth");

router.route("/register").post(upload.single("image"), register);
router.route("/login").post(login);

module.exports = router;
