const products = require("./products.mongo");

async function getAllProducts() {
  return await products.find({});
}

async function getProductById(id) {
  try {
    const product = await products.findOne({ _id: id });
    return product;
  } catch (e) {
    throw e;
  }
}

async function getProductsByCategory(categoryName) {
  return await find({ category: categoryName });
}

async function addNewProduct(newProduct) {
  try {
    await products.create({
      ...newProduct,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateProduct(productId, newProductInfo) {
  try {
    await products.findOneAndUpdate({ _id: productId }, newProductInfo, {
      upsert: true,
    });
  } catch (e) {
    throw new Error("couldn't update product");
  }
}

async function deleteProduct(productId) {
  try {
    await products.deleteOne({ _id: productId });
  } catch (e) {
    throw e;
  }
  return;
}

async function isProductInStock(productId) {
  try {
    const availableQuantity = await products
      .countDocuments({ _id: productId })
      .where("quantity")
      .gte(1);
    return availableQuantity ? true : false;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addNewProduct,
  deleteProduct,
  updateProduct,
  isProductInStock,
};
