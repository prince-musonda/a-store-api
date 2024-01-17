const express = require("express");
const {
  httpGetAllProducts,
  httpGetProductsByCategory,
  httpAddNewProduct,
  httpDeleteProduct,
} = require("./products.controllers");

const ProductsRouter = express.Router();

ProductsRouter.get("/", httpGetAllProducts);
ProductsRouter.get("/category/:category", httpGetProductsByCategory);
ProductsRouter.get("/id/:id");
ProductsRouter.post("/", httpAddNewProduct);
ProductsRouter.delete("/:id", httpDeleteProduct);

module.exports = ProductsRouter;
