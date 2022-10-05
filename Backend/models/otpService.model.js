const { number } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const otpSchema = new Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nftToken : {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});
const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;
