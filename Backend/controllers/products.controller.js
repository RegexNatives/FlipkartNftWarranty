const product = require('../services/products.service');

class ProductController {
    static getAllProducts = async (req, res, next) => {
        try {
            const products = await product.getAllProducts();
            res.status(200).json({
                status: "OK",
                message: "Returned products",
                data: products,
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

module.exports = ProductController;