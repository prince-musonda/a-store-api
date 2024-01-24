const express = require("express");
const { httpAddToCart } = require("./cart.controller");
const { protected } = require("../../middleware/AuthMiddleware");

const cartRouter = express.Router();

// cartRouter.get("/:userId", httpGetUsersCart);
cartRouter.post("/", protected, httpAddToCart);
// cartRouter.delete("/", httpRemoveFromUsersCart);

module.exports = cartRouter;
