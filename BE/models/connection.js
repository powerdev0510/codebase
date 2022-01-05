const { Schema, model } = require("mongoose");

const ConnectionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Connection = model("Connection", ConnectionSchema);

module.exports = Connection;
