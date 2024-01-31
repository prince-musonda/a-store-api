const mongoose = require("mongoose");

const orderedProductSchema = new mongoose.Schema({
  productName: {
    required: true,
    type: String,
  },
  productId: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
    default: 1,
  },
  price: {
    require: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
  size: String,
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  contactDetail: {
    type: String,
    required: true,
  },
  deliveryLocation: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    usersPhone: {
      type: String,
      required: true,
    },
    orderedProducts: [orderedProductSchema],
  },
  { collection: "amora" }
);

module.exports = mongoose.model("Order", orderSchema);
