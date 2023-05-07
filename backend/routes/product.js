const express = require("express");
const router = express.Router();

const { getProductHome, getProductAbout } = require("../controllers/product");

router.route ("/").get(getProductHome);

router.route ("/about").get(getProductAbout);

module.exports = router;