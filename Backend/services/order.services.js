require("dotenv").config();
const createError = require("http-errors");
const { ObjectId } = require("mongodb");
const {Order} = require("../models");


class Orders{
    static getAllOrders = async () => {
        const ord = await Order.find();
        return ord;
    }

    static updateStatus = async (_id, status) => {
        // const ord = await Order.findOne({_id});
        // return ord;
        if(status == "Shipped"){
            const ord = await Order.findByIdAndUpdate({_id}, {orderStatus: status,shippedAt: new Date()});
            return ord;
        }
        else if(status == "Delivered"){
            const ord = await Order.findByIdAndUpdate({_id}, {orderStatus: status,deliveredAt: new Date()});
            return ord;
        }
        else{
            const ord = await Order.findByIdAndUpdate({_id}, {orderStatus: status});
            return ord;
        }
    }
    static getOrderByProducts = async (productId) => {
        const ord = await Order.find({productId:ObjectId(productId)});
        return ord;
    }
}

module.exports = Orders;
