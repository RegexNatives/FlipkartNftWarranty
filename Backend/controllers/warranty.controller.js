require("dotenv").config();
const Warranty = require("../services/warranty.service");
const sendMail = require("../utils/email");
class WarrantyController {
  static createWarrantyRequest = async (req, res, next) => {
    try {
      const warrant = await Warranty.createWarranty(req.body);
      if (!warrant) {
        throw new Error("Warranty not created");
      }
      await sendMail(warrant?.vendorMail);
      res.status(201).json({
        status: true,
        message: "Warranty request created",
        data: warrant?.warranty,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  static getWarrantyStatus = async (req, res, next) => {
    try {
      const { orderId, type } = req.params;
      const warrant = await Warranty.getWarrantyStatus(orderId, type);
      res.status(200).json({
        status: warrant ? true : false,
        message: warrant ? "Warranty status" : "No warranty found",
        data: warrant ? warrant : null,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };

  static updateWarrantyStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const warrant = await Warranty.updateWarrantyStatus(id, status);
      if (!warrant) {
        throw new Error("Error Updating the Order");
      }
      const mailOptions = {
        email: warrant.email,
        subject: "Warranty Request fullfilled",
        message: `Warranty has been assigned, order id: ${warrant.orderId}.Your warranty is valid until ${warrant.validTill} Days from the day of delivery!<br/> You can check your warranty in my warranties section.`,
      };
      await sendMail(mailOptions);
      res.status(200).json({
        status: "OK",
        message: "Warranty status updated",
        data: warrant,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
  static getWarrantyRequests = async (req, res, next) => {
    try {
      // console.log(req.user);
      const warrant = await Warranty.getWarrantyRequests(
        req.user?.payload?._id
      );
      res.status(200).json({
        status: warrant ? true : false,
        message: warrant ? "Warranty requests" : "No warranty requests found",
        data: warrant ? warrant : null,
      });
    } catch (err) {
      res.status(400).json({
        status: "Bad Request",
        message: err.message,
      });
      console.log(err);
      next(err);
    }
  };
}

module.exports = WarrantyController;
