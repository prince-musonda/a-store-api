const Carts = require("./cart.mongo");

async function doesProductExistInCart(usersPhone, productId) {
  try {
    const isProductInCart = await Carts.findOne({
      usersPhone: usersPhone,
      "products.productId": productId,
    });

    if (isProductInCart) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    throw e;
  }
}

async function addProductToCart(usersPhone, newProduct) {
  // add new product to users cart, or create a new cart if the user
  // doesn't have a cart and include the new product in products list
  try {
    await Carts.findOneAndUpdate(
      { usersPhone: usersPhone },
      { $push: { products: newProduct } },
      {
        upsert: true,
      }
    );
  } catch (e) {
    throw e;
  }
}

async function updateProductInCart(usersPhone, newProduct) {
  try {
    await Carts.findOneAndUpdate(
      {
        usersPhone: usersPhone,
        "products.productId": newProduct.productId,
      },
      {
        $set: { "products.$": newProduct },
      }
    );
  } catch (e) {
    throw e;
  }
}

module.exports = {
  doesProductExistInCart,
  addProductToCart,
  updateProductInCart,
};
