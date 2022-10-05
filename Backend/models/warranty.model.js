const mongoose = require("mongoose");

const { Schema } = mongoose;
const WarrantyRequestSchema = new Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: String,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  validTill: {
    type: Number,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Minted"],
  },
});

const WarrantyRequest = mongoose.model(
  "WarrantyRequest",
  WarrantyRequestSchema
);
module.exports = WarrantyRequest;
