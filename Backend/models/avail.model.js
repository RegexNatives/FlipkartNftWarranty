const mongoose = require("mongoose");

const { Schema } = mongoose;
const AvailRequestSchema = new Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
//   buyer: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
  token:{
    type: Number,
    required: true,
  },
  warrantyName : {
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
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed"],
  },
});

const AvailRequest = mongoose.model(
  "AvailRequest",
  AvailRequestSchema
);
module.exports = AvailRequest;
