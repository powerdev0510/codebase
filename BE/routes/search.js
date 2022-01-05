const express = require("express");
const search = require("../controllers/search");

const router = express.Router();

router.get("/user", search.getUsers);
router.get("/auction", search.getAuctions);

module.exports = router;
