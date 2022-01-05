const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  coverImg: {
    type: String,
  },
});

const User = model("User", UserSchema);

module.exports = User;
