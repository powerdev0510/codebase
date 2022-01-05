const express = require("express");
const { validate } = require("../utils/validate");
const user = require("../controllers/user");
const { checkAuth } = require("../controllers/user");

const router = express.Router();

router.post("/connect", validate("user/connect"), user.connect);
router.post("/register", validate("user/register"), user.register);
router.post("/update/:address", checkAuth, user.update);
router.get("/register/unique-check", user.isUnique);
router.get("/:address", user.getProfile);
router.get("/list", user.checkAuth, user.getUsers);

module.exports = router;
