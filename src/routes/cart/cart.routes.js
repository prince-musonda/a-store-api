const express = require("express");

const cartRouter = express.Router();

cartRouter.get("/:userId", httpGetUsersCart);
cartRouter.post("/", httpAddToUsersCart);
cartRouter.delete("/", httpRemoveFromUsersCart);

module.exports = cartRouter;
