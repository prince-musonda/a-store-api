const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../../models/products/products.model");

async function httpGetAllProducts(req, res) {
  try {
    const allProducts = await getAllProducts();
    return res.status(200).json(allProducts);
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
}

async function httpGetProductById(req, res) {
  const productId = req.params.id;
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(400).json({ error: "product not found" });
    } else {
      return res.status(200).json(product);
    }
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
}

function httpGetProductsByCategory(req, res) {}

async function httpAddNewProduct(req, res) {
  const newProduct = req.body;
  // type convention
  newProduct.quantity = Number(newProduct.quantity);
  newProduct.price = Number(newProduct.price);
  try {
    await addNewProduct(newProduct);
    return res.status(201).json({ message: "successful added" });
  } catch (e) {
    return res.status(500).json({ error: "something went wrong" });
  }
}

async function httpUpdateProduct(req, res) {
  const productId = req.params.id;
  const updatedProductInfo = req.body;
  try {
    await updateProduct(productId, updatedProductInfo);
    return res
      .status(200)
      .json({ message: "succesfull updated or created a new product" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "failed to update or create a new product" });
  }
}

async function httpDeleteProduct(req, res) {
  //id of product to delete
  const productId = req.params.id;
  if (!productId) res.status(400).json({ error: "no product id provided" });
  try {
    await deleteProduct(productId);
    res
      .status(200)
      .json({ message: `successfully deleted product with id ${productId}` });
  } catch (e) {
    return res.status(500).json({ error: "failed to delete" });
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductsByCategory,
  httpGetProductById,
  httpAddNewProduct,
  httpUpdateProduct,
  httpDeleteProduct,
};
