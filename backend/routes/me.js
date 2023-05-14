const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../controllers/me");

router.get("/", getUserInfo);

module.exports = router;
