const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please provide your first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "please provide your first name"],
    trim: true,
  },

  phone: {
    type: String,
    unique: true,
    required: [true, "please provide a phone number"],
  },
  password: {
    type: String,
    require: [
      true,
      "please provide a password and minimum lenghth should be 8 characters",
    ],
    minlength: 8,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
