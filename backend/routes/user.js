const express = require("express");
const router = express.Router();

const { getUserAbout, getUserHome } = require("../controllers/user");

router.route("/").get(getUserHome);

router.route("/about").get(getUserAbout);

module.exports = router;
