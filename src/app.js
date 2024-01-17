const path = require("path");
const express = require("express");
const cors = require("cors");
const productsRouter = require("./routes/products/products.routes");
const imagesRouter = require("./routes/images/images.routes");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", productsRouter);
app.use("/images", imagesRouter);
app.use("/", express.static(path.join(__dirname, "public")));

module.exports = app;
