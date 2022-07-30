const auth = require("../services/auth.services");
const middleware = require("../middleware/auth")

class AuthController {
  static register = async (req, res, next) => {
    try {
      const user = await auth.register(req.body);
      res.status(200).json({
        status: "registered",
        message: "User registered successfully",
        data: user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
  static login = async (req, res, next) => {
    try {
      const user = await auth.login(req.body);
      res.status(200).json({
        status: "logged in",
        message: "User logged in successfully",
        data: user,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  static verifyToken = async (req, res, next) => {
    try {
      const user = await middleware(req,next);
      res.status(200).json({
        status: "verified",
        message: "Access Token verified",
        data: req.user.payload,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  

  static all = async (req, res, next) => {
    try {
      const users = await auth.all();
      res.status(200).json({
        status: "OK",
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
