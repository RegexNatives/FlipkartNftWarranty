const { User } = require("../models");
const order = require("../services/order.services");
const sendEmail = require("../utils/email");
class OrderController {
  static getAllOrders = async (req, res, next) => {
    try {
      const orders = await order.getAllOrders(req.user?.payload);
      res.status(200).json({
        status: "OK",
        message: "Returned orders",
        data: orders,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  static getAllOrdersByVendor = async (req, res, next) => {
    try {
      const orders = await order.getAllOrdersByVendor(req.user?.payload?._id);
      res.status(200).json({
        status: "OK",
        message: "Returned orders",
        data: orders,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  static updateStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(id, status);
      const ord = await order.updateStatus(id, status);
      if (ord !== null) {
        const user = await User.findById(ord.buyer);
        await sendEmail({
          email: user.email,
          subject: "Order Status Updated",
          message: `Your order status has been updated to ${status}`,
        });
      }
      res.status(200).json({
        status: "OK",
        message: "Order status updated",
        data: ord,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };

  static getOrderByProducts = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const orders = await order.getOrderByProducts(productId);
      res.status(200).json({
        status: "OK",
        message: "Returned orders",
        data: orders,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };

  static createOrder = async (req, res, next) => {
    try {
      // console.log(req.body,req.user);
      const orderData = req.body;
      const ord = await order.createOrder(orderData, req?.user?.payload);
      if (!ord) {
        throw new Error("Order not created");
      }
      const buyeroptions = {
        email: req.user.payload.email,
        subject: "Order Placed",
        message: `Your order has been placed successfully, your order id is ${ord.order._id}`,
      };
      await sendEmail(buyeroptions);
      const vendorOptions = {
        email: ord.vendorEmail,
        subject: "New Order!",
        message: `You have received a new order with order id ${ord.order._id}`,
      };
      await sendEmail(vendorOptions);
      res.status(200).json({
        status: true,
        message: "Order created Successfully",
        data: ord.order,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  static getOrderById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ord = await order.getOrderById(id);
      if (!ord) {
        throw new Error("Order not found");
      }
      res.status(200).json({
        status: "OK",
        message: "Returned order",
        data: ord,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  getorderByVendorId;
}

module.exports = OrderController;
