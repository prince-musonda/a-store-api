const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  products: [
    {
      productName: String,
      price: Number,
      productId: String,
      Quantity: {
        type: Number,
        default: 1,
      },
      size: String,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
