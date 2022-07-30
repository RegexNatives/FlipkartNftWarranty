require("dotenv").config();
const WarrantyRequest = require("../models/warranty");

class Warranty{
    static createWarranty = async (productId,orderId, customerWallet, description,type) => {
        const warranty = await WarrantyRequest.create({productId,orderId,customerWallet, description,type});
        return warranty;
    }
    static getWarrantyStatus = async (orderId,type) => {
        const warranty = await WarrantyRequest.findOne({orderId,type});
        return warranty;
    }
    static updateWarrantyStatus = async (id,status) =>{
        const warranty = await WarrantyRequest.findByIdAndUpdate(id,{status});
        return warranty;
    }
}

module.exports = Warranty;