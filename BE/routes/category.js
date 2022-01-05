const express = require("express");
const { validate } = require("../utils/validate");
const category = require("../controllers/category");
const { checkAuth } = require("../controllers/user");

const router = express.Router();

router.get("/list", category.list);
router.post("/create", checkAuth, validate("category/create"), category.create);
router.delete("/delete/:id", checkAuth, category.remove);

module.exports = router;
