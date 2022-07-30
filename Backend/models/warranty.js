const mongoose = require("mongoose");

const {Schema} = mongoose;
const WarrantyRequestSchema = new Schema({
    productId: {
        type: String,
        required: true,
        default:''
    },
    orderId: {
        type: String,
        required: true,
        default:''
    },
    customerWallet: {
        type: String,
        required: true,
        default:''
    },
    description: {
        type: String,
        required: true,
        default:''
    },
    type:{
        type:String,
        required:true,
        default:'getWarranty',
        enum:['getWarranty','revailWarranty','resaleWarranty']
    },
    status:{
        type:String,
        default:'Pending',
        enum:['Pending','Minted']
    }
})

const WarrantyRequest = mongoose.model("WarrantyRequest", WarrantyRequestSchema);
module.exports = WarrantyRequest;
