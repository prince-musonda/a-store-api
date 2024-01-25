const { getProductById } = require("../../models/products/products.model.js");
const {
  doesProductExistInCart,
  getCart,
  addProductToCart,
  updateProductInCart,
  removeProductInCart,
} = require("../../models/carts/cart.model.js");

async function httpGetUsersCart(req, res) {
  const user = req.user;
  const usersPhone = user.phone;
  try {
    // get users cart
    const usersCart = await getCart(usersPhone);

    res
      .status(200)
      .json({ success: true, data: { products: usersCart.products } });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
}

async function httpAddToCart(req, res) {
  const user = req.user;
  const { productId, quantity, size } = req.body;
  const usersPhone = user.phone;
  try {
    // check if product is in stock
    const product = await getProductById(productId);
    if (product.quantity > 0) {
      // check if product isn't already in users cart
      const isProductAlreadyInCart = await doesProductExistInCart(
        usersPhone,
        productId
      );
      if (isProductAlreadyInCart) {
        return res.status(200).json({ success: true });
      }

      // else, add product to users cart
      const productToAdd = {
        productId: product._id,
        productName: product.productName,
        image: product.imagesUrl[0],
        price: product.price,
        size,
        quantity,
      };
      await addProductToCart(usersPhone, productToAdd);
      return res.status(200).json({ success: true });
    }
    // When out of stock
    return res
      .status(400)
      .json({ success: false, message: "Sorry, but we are out of stock" });
  } catch (e) {
    // console.log(e);
    console.error(e);
    return res
      .status(500)
      .json({ success: false, message: "sorry, something went wrong" });
  }
}

async function httpRemoveItemFromCart(req, res) {
  const user = req.user;
  const usersPhone = user.phone;
  const productToRemove = req.body;
  const productId = productToRemove.productId;
  try {
    await removeProductInCart(usersPhone, productId);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
}

module.exports = {
  httpGetUsersCart,
  httpAddToCart,
  httpRemoveItemFromCart,
};
