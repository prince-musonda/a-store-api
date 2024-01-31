const express = require("express");
const { protected } = require("../../middleware/AuthMiddleware");
const { httpAddNewOrder } = require("./orders.controllers");

const ordersRouter = express.Router();

ordersRouter.post("/", protected, httpAddNewOrder);

module.exports = ordersRouter;
