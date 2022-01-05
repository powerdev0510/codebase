const express = require("express");
const { validate } = require("../utils/validate");
const { checkAuth } = require("../controllers/user");
const pixel = require("../controllers/pixel");

const router = express.Router();

router.get("/approve/:id", checkAuth, validate("auction"), pixel.approve);

module.exports = router;
