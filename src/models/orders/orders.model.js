const Orders = require("./orders.mongo");
const Users = require("../users/users.model");

async function addOrder({ usersPhone, orderedProduct }) {
  try {
    const usersOrders = await Orders.findOneAndUpdate({
      usersphone: usersPhone,
    });

    const newOrder = {
      productName: orderedProduct.productName,
      productId: orderedProduct.productID,
      image: orderedProduct.image,
      price: orderedProduct.price,
      quantity: orderedProduct.quantity,
      deliveryLocation: orderedProduct.deliveryAddress,
      contactDetail: orderedProduct.contactDetail,
      productId: orderedProduct.productId,
      dateCreated: Date.now(),
      delivered: false,
    };

    if (!usersOrders) {
      const { firstName, lastName } = await Users.findOne({
        phone: usersPhone,
      });

      await Orders.create({
        firstName,
        lastName,
        usersPhone,
        orderedProducts: [newOrder],
      });
    }
    // else if use already has an existing list of orders
    else if (usersOrders) {
      usersOrders.orderedProducts.push(newOrder);
      await usersOrders.save();
    }
  } catch (e) {
    throw e;
  }
}

async function getAllOrders() {
  try {
    listOfOrders = Orders.find({}).sort("dateCreated");
    return listOfOrders;
  } catch (e) {
    throw e;
  }
}

module.exports = { addOrder, getAllOrders };
