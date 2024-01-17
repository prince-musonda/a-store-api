const products = require("./products.mongo");

async function getAllProducts() {
  return await products.find({});
}

async function getProductById(id) {
  return await products.findOne({ _id: id });
}

async function getProductsByCategory(categoryName) {
  return await find({ category: categoryName });
}

async function addNewProduct(newProduct) {
  try {
    products;
    await products.updateOne(
      {
        // filters
        productName: newProduct.productName,
        imagesUrl: newProduct.imagesUrl,
      },
      {
        // update or create
        ...newProduct,
      },
      {
        // enable update or insert
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw error;
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

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  addNewProduct,
  deleteProduct,
};
