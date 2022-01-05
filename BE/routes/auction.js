const express = require("express");
const { validate } = require("../utils/validate");
const auction = require("../controllers/auction");
const { checkAuth } = require("../controllers/user");

const router = express.Router();

router.post(
  "/create",
  checkAuth,
  validate("auction/create"),
  auction.createAuction
);
router.get("/list", auction.getAuctionList);
router.post("/bid", checkAuth, validate("auction/bid"), auction.placeBid);
router.get("/detail/:id", validate("auction"), auction.getAuctionInfo);
router.get("/history/:id", validate("auction"), auction.getHistory);
router.get("/purchase/:id", checkAuth, validate("auction"), auction.purchase);
router.get("/watch/:id", checkAuth, validate("auction"), auction.isWatched);
router.post("/watch/:id", checkAuth, validate("auction"), auction.watch);

module.exports = router;
