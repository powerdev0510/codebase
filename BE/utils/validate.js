const { body, param, query } = require("express-validator");
const msg = require("./message");

const validate = (method) => {
  switch (method) {
    case "user/connect":
      return [body("address", msg.address_required).not().isEmpty()];
    case "user/register":
      return [
        body("address", msg.address_required).not().isEmpty(),
        body("name", msg.name_required).not().isEmpty(),
      ];
    case "nft/mint":
      return [
        body("title", msg.title_required).not().isEmpty(),
        body("price", msg.price_required).not().isEmpty(),
        body("chain", msg.chain_required).not().isEmpty(),
        body("category", msg.category_required).not().isEmpty(),
      ];
    case "nft/approve":
      return [param("tokenId", msg.tokenId_required).not().isEmpty()];
    case "auction":
      return [param("id", msg.auctionId_required).not().isEmpty()];
    case "auction/create":
      return [
        body("tokenId", msg.tokenId_required).not().isEmpty(),
        body("startTime", msg.startTime_required).not().isEmpty(),
        body("endTime", msg.endTime_required).not().isEmpty(),
      ];
    case "auction/bid":
      return [
        body("price", msg.price_required).not().isEmpty(),
        body("auctionId", msg.auctionId_required).not().isEmpty(),
      ];
    case "category/create":
      return [
        body("label", msg.label_required).not().isEmpty(),
        body("value", msg.value_required).not().isEmpty(),
      ];
    case "image":
      return [query("url", msg.url_required).not().isEmpty()];
  }
};

module.exports = {
  validate,
};
