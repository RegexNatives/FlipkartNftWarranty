const auth = require("../services/auth.services");
const middleware = require("../middleware/auth");

class AuthController {
  static register = async (req, res, next) => {
    try {
      const data = await auth.register(req.body, res);
      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    }
  };
  static login = async (req, res, next) => {
    try {
      const data = await auth.login(req.body, false);
      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  };

  static loginVendor = async (req, res, next) => {
    try {
      const data = await auth.login(req.body, true);
      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  };
  static loginAdmin = async (req, res, next) => {
    try {
      const data = await auth.loginAdmin(req.body);
      res.status(200).json({
        status: data.status,
        message: data.message,
        data: data.data,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  };

  static verifyToken = async (req, res, next) => {
    try {
      const user = await middleware(req, next);
      res.status(200).json({
        status: true,
        message: "Access Token verified",
        data: req.user.payload,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static all = async (req, res, next) => {
    try {
      const { type, page, limit } = req.query;
      const id = req.user?.payload?._id;
      const users = await auth.all({ type, page, limit, id });
      if (!users) {
        res.status(400).json({
          message: "No users found",
        });
      }
      res.status(200).json({
        status: true,
        message: "Returned users",
        data: users,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

module.exports = AuthController;
