const express = require("express");
const { getImage } = require("../controllers/user");
const { validate } = require("../utils/validate");

const router = express.Router();

router.get("/", validate("image"), getImage);

module.exports = router;
