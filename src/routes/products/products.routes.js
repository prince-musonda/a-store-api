const express = require("express");
const {
  httpGetAllProducts,
  httpGetProductsByCategory,
  httpAddNewProduct,
} = require("./products.controllers");

const ProductsRouter = express.Router();

ProductsRouter.get("/", httpGetAllProducts);
ProductsRouter.get("/category/:category", httpGetProductsByCategory);
ProductsRouter.get("/id/:id");
ProductsRouter.post("/", httpAddNewProduct);

module.exports = ProductsRouter;
