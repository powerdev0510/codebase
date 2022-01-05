const express = require("express");
const { checkAuth } = require("../controllers/user");
const nft = require("../controllers/nft");
const { validate } = require("../utils/validate");

const router = express.Router();

router.post("/mint", checkAuth, validate("nft/mint"), nft.mintNFT);
router.get("/balance", checkAuth, nft.getBalance);
router.get("/collections", nft.getCollections);
router.get("/mycollections", checkAuth, nft.getMyCollections);
router.get(
  "/approve/:tokenId",
  checkAuth,
  validate("nft/approve"),
  nft.approve
);
router.get("/creators", checkAuth, nft.getCreators);
// router.post("/buy", checkAuth, nft.buyToken);
// router.get("/last/:number", checkAuth, nft.getLastNTokens);
// router.get("/history/:tokenId", checkAuth, nft.getNFTHistory);
// router.get("/history/user/:address", checkAuth, nft.getUserNFTHistory);
// router.post("/price", checkAuth, nft.setTokenPrice);
// router.get("/price/:tokenId", checkAuth, nft.getTokenPrice);
// router.get("/uri/:tokenId", checkAuth, nft.getTokenURI);
// router.post("/transfer", checkAuth, nft.transferNft);
// router.get("/owner/:tokenId", checkAuth, nft.getOwner);

module.exports = router;
