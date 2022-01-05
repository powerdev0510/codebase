"use strict";

const express = require("express");
const router = express.Router();
const user = require("./user");
const connection = require("./connection");
const pixel = require("./pixel");
const nft = require("./nft");
const auction = require("./auction");
const category = require("./category");
const image = require("./image");
const search = require("./search");

router.use("/user", user);
router.use("/connection", connection);
router.use("/pixel", pixel);
router.use("/nft", nft);
router.use("/auction", auction);
router.use("/category", category);
router.use("/image", image);
router.use("/search", search);

module.exports = router;
