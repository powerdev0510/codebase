const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Category = model("Category", CategorySchema);

module.exports = Category;
