const { addOrder, getAllOrders } = require("../../models/orders/orders.model");
const { getProductById } = require("../../models/products/products.model");

async function httpAddNewOrder(req, res) {
  const user = req.user;
  const productToBeOrdered = req.body;
  productToBeOrdered.quantity = Number(productToBeOrdered.quantity);
  //check if we have enough items left in stock
  const productInStock = await getProductById(productToBeOrdered.productId);
  const availableQuantity = productInStock.quantity;
  const productName = productInStock.productName;
  if (availableQuantity == 0) {
    return res.status(400).json({
      success: false,
      message: `Sorry, but we are out of stock. We no longer have ${productName}`,
    });
  } else if (availableQuantity < productToBeOrdered.quantity) {
    return res.status(400).json({
      success: false,
      message: `Failed to make purchase or place order. They are only ${availableQuantity} ${productName} left.`,
    });
  } else {
    // Else if we have enough items left in stock
    // reduce the number of products in stock and then save the users order or purchadse
    productInStock.quantity -= productToBeOrdered.quantity;
    productInStock.save();
    productToBeOrdered.productName = productInStock.productName;
    productToBeOrdered.image = productInStock.imagesUrl[0];
    productToBeOrdered.price =
      productInStock.price * productToBeOrdered.quantity;
    addOrder({ usersPhone: user.phone, orderedProduct: productToBeOrdered });
    return res.status(200).json({
      success: true,
      message: `You order for ${productInStock.productName} is successful. You will be contacted soon`,
    });
  }
}

async function httpAdminGetAllOrders(req, res) {
  try {
    const orders = await getAllOrders();
    res.status(200).json({ success: true, orders: orders });
  } catch (e) {
    throw e;
    res.status(500).json({
      success: false,
      message: `sorry something went wrong. Couldn't get the list of orders`,
    });
  }
}

module.exports = { httpAddNewOrder, httpAdminGetAllOrders };
