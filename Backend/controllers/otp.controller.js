const otpService = require("../services/otp.service");

class otp {
  static async initiateTransfer(req, res) {
    try {
      const id = req.user.payload._id;
      const data = req.body;
      const userId = data.userId;
      const otpData = await otpService.initiateTransfer(id, data, userId);
      res.status(200).json({
        status: "OK",
        message: "transfer initiated",
        data: otpData,
      });
    } catch (error) {
      res.status(400).json({
        status: "Bad Request",
        message: error.message,
      });
    }
  }

  static async completeTransfer(req, res) {
    try {
      const data = req.body;
      const id = req.user.payload._id;
      const userId = data.userId;
      const otp = data.otp;
      const otpData = await otpService.completeTransfer(id, userId, otp);
      if (otpData) {
        res.status(200).json({
          status: "OK",
          message: "OTP Verified",
        });
      } else {
       res.status(200).json({
          status : false,
          message : "Invalid OTP"
       })
      }
    } catch (error) {
      res.status(400).json({
        status: "Bad Request",
        message: error.message,
      });
    }
  }
  static async sendConfirmation(req, res) {
    try {
      const data = req.body;
      const id = req.user.payload._id;
      const userId = data.userId;
      const otp = data.otp;
      await otpService.sendConfirmation(id, userId, otp);
      res.status(200).json({
        status: "OK",
        message: "email Sent",
      });
    } catch (error) {
      res.status(400).json({
        status: "Bad Request",
        message: error.message,
      });
    }
  }
}

module.exports = otp;
