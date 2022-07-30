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

const Product = mongoose.model("Product", ProductSchema);

module.exports=Product;
