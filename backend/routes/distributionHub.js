const express = require("express");
const router = express.Router();
const { getHubs, getHubId } = require("../controllers/distributionHub");

router.route("/").get(getHubs);
router.route("/:id").get(getHubId);

module.exports = router;
