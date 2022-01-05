const { Schema, model } = require("mongoose");

const WatchListSchema = new Schema({
  isWatched: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  auctionId: {
    type: String,
    required: true,
  },
});

const WatchList = model("WatchList", WatchListSchema);

module.exports = WatchList;
