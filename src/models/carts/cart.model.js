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

async function getCart(usersPhone) {
  try {
    const usersCart = await Carts.findOne(
      { usersPhone: usersPhone },
      { _id: 0, usersPhone: 0, __v: 0, "products._id": 0 }
    );
    // return usersCart or return an empty list if user has no cart
    return usersCart || [];
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

async function removeProductInCart(usersPhone, productId) {
  try {
    const usersCart = await Carts.findOne({ usersPhone: usersPhone });
    // when users cart doesn't exist
    if (!usersCart) {
      return;
    }
    // when users cart exists, find the index(position) of the
    // item(product) that we want to remove
    const productIndex = usersCart.products.findIndex((product) => {
      return product.productId == productId;
    });

    //if product was not found in cart, then exit the function
    if (productIndex === -1) return;
    //if product was found, then remove it from cart
    usersCart.products.splice(productIndex, 1);
    // save changes to database
    await usersCart.save();
  } catch (e) {
    throw e;
  }
}

module.exports = {
  doesProductExistInCart,
  getCart,
  addProductToCart,
  updateProductInCart,
  removeProductInCart,
};
