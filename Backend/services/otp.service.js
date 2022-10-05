const sendEmail = require("../utils/email");
const User = require("../models/user.model");
const OTP = require("../models/otpService.model");
class otpService {
  static async initiateTransfer(id, data, userId) {
    try {
      const userdetails = await User.findById(userId);
      const seller = await User.findById(id);
      const otp = Math.floor(Math.random() * 1000000);

      const otpData = await OTP.create({
        createdBy: id,
        productName: data.productName,
        buyer: userId,
        otp: otp,
        nftToken : data.token,
      });
      const otpMessage = `Your Code is ${otp} for transferring the product to ${userdetails.name} and wallet address is ${userdetails.walletAddress} from ${seller.name}`;
      await sendEmail({
        email: userdetails.email,
        subject: "OTP for product transfer",
        message: otpMessage,
      });
      return otpData;
    } catch (error) {
      throw error;
    }
  }

  static async completeTransfer(id, userId, otp) {
    try {
      const otpData = await OTP.findOne({
        otp: otp,
        createdBy: id,
        buyer: userId,
      });
      if (otpData) {
        return otpData;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  static async sendConfirmation(id, userId, otp) {
    try {
      const otpData = await OTP.findOne({
        otp: otp,
        createdBy: id,
        buyer: userId,
      });
      console.log(otpData);
      const userdetails = await User.findById(userId);
      const vendor = await User.findById(id);
      const transferMessage = `The Warranty  has been transferred to ${userdetails.name} and wallet address is ${userdetails.walletAddress} from ${vendor.name} for the product ${otpData.productName}`;
      await sendEmail({
        email: userdetails.email,
        subject: "Product transfer",
        message: transferMessage,
      });
      await OTP.deleteOne({ _id: otpData._id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = otpService;
