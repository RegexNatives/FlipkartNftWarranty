const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        default:''
    },
    price:{
        type:String,
        required:true,
        default:''
    },
    image:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    }
})
const shippingInfo = new Schema({
    address: {
        type: String,
        required: true,
        default:''
    },
    city: {
        type: String,
        required: true,
        default:''
    },
    state: {
        type: String,
        required: true,
        default:''
    },
    country: {
        type: String,
        required: true,
        default:''

    },
    pincode: {
        type: String,
        required: true,
        default:''
    }
})
const paymentInfo = new Schema({
    id: {
        type: String,
        required: true,
        default:''
    },
    status: {
        type: String,
        required: true,
        default:''
    }
})

const OrderSchema = new Schema(
	{
        shippingInfo: {
            type: shippingInfo,
        },
        paymentInfo: {
            type: paymentInfo,
        },
        orderItem: {
            type: ProductSchema
        },
        user: {
            type:"String"
        },
        paidAt: {
            type: Date,
            default: Date.now
        },
        orderStatus:{
            type:String,
            default:"Processing",
            enum:["Processing","Delivered","Shipped"],
            required:true
        },
        totalPrice:{
            type:String 
        },
        createdAt : {
            type: Date,
            default: Date.now
        },
        shippedAt : {
            type: Date,
            default: Date.now
        },
        deliveredAt : {
            type: Date,
            default: Date.now
        },
        productId : {
            type: String,
            required: true,
            default:''
        }

	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
