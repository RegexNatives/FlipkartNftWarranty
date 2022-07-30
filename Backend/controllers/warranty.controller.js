require("dotenv").config();
const Warranty = require('../services/warranty.service');

class WarrantyController {
    static createWarrantyRequest = async (req, res, next) => {
        try {
            console.log(req.body);
            const { productId,orderId, customerWallet, description,type } = req.body;
            const warrant = await Warranty.createWarranty(productId,orderId, customerWallet, description,type);
            res.status(200).json({
                status: "OK",
                message: "Warranty request created",
                data: warrant,
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
    static getWarrantyStatus = async (req, res, next) => {
        try {
            const { orderId,type } = req.params;
            const warrant = await Warranty.getWarrantyStatus(orderId,type);
            res.status(200).json({
                status: warrant?true:false,
                message: warrant?"Warranty status":"No warranty found",
                data: warrant?warrant:null,
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
    static updateWarrantyStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const warrant = await Warranty.updateWarrantyStatus(id,status);
            res.status(200).json({
                status: "OK",
                message: "Warranty status updated",
                data: warrant,
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

module.exports = WarrantyController;