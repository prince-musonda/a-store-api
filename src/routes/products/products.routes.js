const express = require("express");
const {
  httpGetAllProducts,
  httpGetProductsByCategory,
  httpAddNewProduct,
  httpUpdateProduct,
  httpDeleteProduct,
  httpGetProductById,
} = require("./products.controllers");

const ProductsRouter = express.Router();

ProductsRouter.get("/", httpGetAllProducts);
ProductsRouter.get("/category/:category", httpGetProductsByCategory);
ProductsRouter.get("/id/:id", httpGetProductById);
ProductsRouter.post("/", httpAddNewProduct);
ProductsRouter.put("/:id", httpUpdateProduct);
ProductsRouter.delete("/:id", httpDeleteProduct);

module.exports = ProductsRouter;
