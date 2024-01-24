const mongoose = require("mongoose");

const cartProductSubSchema = new mongoose.Schema({
  productName: {
    require: true,
    type: String,
  },
  productId: {
    require: true,
    type: String,
  },
  quantity: {
    require: true,
    type: Number,
    default: 1,
  },
  image: {
    required: true,
    type: String,
  },
  size: String,
});

const cartSchema = new mongoose.Schema({
  // user will be the phone number associated with the user
  usersPhone: {
    type: String,
    required: [true, "your need to login"],
  },
  products: [cartProductSubSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
