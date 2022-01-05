const { Schema, model } = require("mongoose");

const AuctionSchema = new Schema({
  blockNumber: {
    type: String,
    required: true,
  },
  itemId: {
    type: Number,
    required: true,
  },
  tokenId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  seller: {
    type: String,
    required: true,
  },
  bidder: {
    type: String,
  },
  mediaPath: {
    type: String,
  },
  startPrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  status: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
  startAt: {
    type: Number,
  },
  endAt: {
    type: Number,
  },
});

const Auction = model("Auction", AuctionSchema);

module.exports = Auction;
