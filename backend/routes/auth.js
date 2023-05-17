const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinaryUpload");

const { register, login } = require("../controllers/auth");

router.route("/register").post(upload.single("image"), register);
router.route("/login").post(login);

module.exports = router;
