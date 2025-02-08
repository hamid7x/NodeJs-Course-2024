const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    inStock: Boolean,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productsSchema);
