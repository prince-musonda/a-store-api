const mongoose = require("mongoose");
const productsModel = require("./products.mongo");

const productsSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagesUrl: {
    type: [String],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String],
  },
});

module.exports = mongoose.model("Product", productsSchema);
