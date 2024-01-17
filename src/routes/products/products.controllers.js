const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addNewProduct,
} = require("../../models/products/products.model");

async function httpGetAllProducts(req, res) {
  try {
    const allProducts = await getAllProducts();
    return res.status(200).json(allProducts);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
}

function httpGetProductsByCategory(req, res) {}
function httpGetProductById(req, res) {}

async function httpAddNewProduct(req, res) {
  const newProduct = req.body;
  // type convention
  newProduct.quantity = Number(newProduct.quantity);
  newProduct.price = Number(newProduct.price);
  console.log(newProduct);
  try {
    await addNewProduct(newProduct);
    return res.status(201).json({ message: "successful added" });
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductsByCategory,
  httpGetProductById,
  httpAddNewProduct,
};
