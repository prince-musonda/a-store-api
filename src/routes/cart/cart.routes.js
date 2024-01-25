const express = require("express");
const {
  httpAddToCart,
  httpGetUsersCart,
  httpRemoveItemFromCart,
} = require("./cart.controller");
const { protected } = require("../../middleware/AuthMiddleware");

const cartRouter = express.Router();

cartRouter.get("/", protected, httpGetUsersCart);
cartRouter.post("/", protected, httpAddToCart);
cartRouter.delete("/", protected, httpRemoveItemFromCart);

module.exports = cartRouter;
