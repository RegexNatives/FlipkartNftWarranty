require("dotenv").config();
const createError = require("http-errors");
const { ObjectId } = require("mongodb");
const { Order, Product, User } = require("../models");

class Orders {
  static getAllOrders = async (user) => {
    const ord = await Order.find({ buyer: user?._id })
      .populate("orderItems")
      .sort({ createdAt: -1 });
    return ord;
  };

  static getAllOrdersByVendor = async (user) => {
    const ord = await Order.find({
      vendor: user,
    })
      .populate("buyer orderItems")
      .sort({ orderStatus: -1 });
    return ord;
  };

  static getOrderById = async (_id) => {
    const ord = await Order.findOne({ _id });
    return ord;
  };

  static createOrder = async (order, user) => {
    order.buyer = user?._id;
    const prod = await Product.findOne({ _id: order.orderItems });
    prod.orderPlaced = prod.orderPlaced + 1;
    prod.totalSales += prod.price;

    await prod.save();

    const ord = await Order.create(order);
    const vendor = await User.findById(prod.vendor);
    return { order: ord, vendorEmail: vendor.email };
  };

  static updateStatus = async (_id, status) => {
    if (status == "Shipped") {
      const ord = await Order.findByIdAndUpdate(
        { _id },
        { orderStatus: status, shippedAt: new Date() }
      );
      return ord;
    } else if (status == "Delivered") {
      const ord = await Order.findByIdAndUpdate(
        { _id },
        { orderStatus: status, deliveredAt: new Date() }
      );
      return ord;
    } else {
      const ord = await Order.findByIdAndUpdate(
        { _id },
        { orderStatus: status }
      );
      return ord;
    }
  };
  static getOrderByProducts = async (productId) => {
    const ord = await Order.find({ productId: ObjectId(productId) });
    return ord;
  };
}

module.exports = Orders;
