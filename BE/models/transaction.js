const { Schema, model } = require("mongoose");

const TransactionSchema = new Schema({
  blockNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  txHash: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  auctionId: {
    type: Number,
  },
  itemId: {
    type: Number,
  },
  uri: {
    type: String,
  },
  price: {
    type: String,
  },
  purchaseAt: {
    type: String,
  },
});

const Transaction = model("Transaction", TransactionSchema);

module.exports = Transaction;
