const express = require("express");
const { protected } = require("../../middleware/AuthMiddleware");
const {
  httpAddNewOrder,
  httpAdminGetAllOrders,
} = require("./orders.controllers");

const ordersRouter = express.Router();

ordersRouter.get("/admin", httpAdminGetAllOrders);
ordersRouter.post("/", protected, httpAddNewOrder);

module.exports = ordersRouter;
