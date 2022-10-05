require("dotenv").config();
const Avail = require("../services/avail.service");
const sendMail = require("../utils/email");
class AvailController {

  static createAvailRequest = async (req, res, next) => {
    try {
      const warrant = await Avail.createAvail(req.body);
      if (!warrant) {
        throw new Error("Warranty not created");
      }
      if(!warrant.status){
        res.status(201).json({
          status: false,
          message: "Warranty already exists",
          data: warrant?.warranty,
        });
        return ;
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
  // Finds only Pending request
  static getAvailStatus = async (req, res, next) => {
    try {
      const { token } = req.params;
      const avail = await Avail.getAvailStatus(token);
      res.status(200).json({
        status: avail ? true : false,
        message: avail ? "Avail status" : "No Avail found",
        data: avail ? avail : null,
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

  static updateAvailStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const avail = await Avail.updateAvailStatus(id, status);
      if (!avail) {
        throw new Error("Error Updating the Order");
      }
      const mailOptions = {
        email: avail.email,
        subject: "Claim Request fullfilled",
        message: `Claim has been successfully fulfilled by the vendor ! `,
      };
      await sendMail(mailOptions);
      res.status(200).json({
        status: "OK",
        message: "Warranty status updated",
        data: avail,
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

  static getAvailRequests = async (req, res, next) => {
    try {
      // console.log(req.user);
      const warrant = await Avail.getAvailRequests(req.user?.payload?._id);

      res.status(200).json({
        status: warrant ? true : false,
        message: warrant ? "Avail requests" : "No Avail requests found",
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

module.exports = AvailController;
