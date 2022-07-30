const order = require('../services/order.services');

class OrderController {
    static getAllOrders = async (req, res, next) => {
        try {
            const orders = await order.getAllOrders();
            res.status(200).json({
                status: "OK",
                message: "Returned orders",
                data: orders,
            });
        } catch (err) {
            res.status(400).json({
                status: "Bad Request",
                message: err.message,
            })
            console.log(err);
            next(err);
        }
    }

    static updateStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            console.log(id, status);
            const ord = await order.updateStatus(id, status);
            res.status(200).json({
                status: "OK",
                message: "Order status updated",
                data: ord,
            });
        } catch (err) {
            res.status(400).json({
                status: "Bad Request",
                message: err.message,
            })
            console.log(err);
            next(err);
        }
    }

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
            })
            console.log(err);
            next(err);
        }
    }
}

module.exports = OrderController;