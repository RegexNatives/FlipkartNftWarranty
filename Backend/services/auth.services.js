require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { User } = require("../models");
const sendEmail = require("../utils/email");
class AuthService {
  static register = async (data, res) => {
    const { email, password, name, phone, walletAddress } = data;

    let test_user = await User.findOne({ email: email });
    if (test_user?.email) {
      return { status: false, message: "Email already registered" };
    }

    let pass = bcrypt.hashSync(password, 8);

    let user = await User.create({
      email,
      password: pass,
      name,
      phone,
      walletAddress,
    });
    data.accessToken = await jwt.signAccessToken(user);
    await sendEmail({
      email: email,
      subject: "Registration Successful",
      message: "Welcome to the family",
    });
    delete data.password;
    return { status: true, message: "User created successfully", data: data };
  };

  static resetPassword = async (data) => {};

  static login = async (data, isVendor = false) => {
    const { email, password } = JSON.parse(JSON.stringify(data));

    const user = await User.findOne({ email: email });
    if (!user) {
      // res.status(200).json({ message: "User Not Found!" });
      return { status: false, message: "User Not Found!" };
    }

    if (isVendor) {
      if (user.type !== "vendor") {
        return { status: false, message: "Vendor Not Found!" };
      }
    }

    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      return { status: false, message: "Invalid Credentials!" };
    }
    delete user.password;

    const accessToken = await jwt.signAccessToken(user._doc, {
      expiresIn: "720h",
    });
    return {
      data: { ...user._doc, accessToken },
      status: true,
      message: "User logged in successfully",
    };
  };

  static loginAdmin = async (data) => {
    const { email, password } = JSON.parse(JSON.stringify(data));

    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      return { status: false, message: "User Not Found!" };
    }
    if (user.type == "admin" || user.type == "superAdmin") {
      const checkPass = bcrypt.compareSync(password, user.password);
      if (!checkPass) {
        return { status: false, message: "Invalid Credentials!" };
      }
      delete user.password;

      const accessToken = await jwt.signAccessToken(user._doc, {
        expiresIn: "720h",
      });
      return {
        data: { ...user._doc, accessToken },
        status: true,
        message: "User logged in successfully",
      };
    } else {
      return { status: false, message: "Invalid Credentials!" };
    }
  };

  static all = async (body) => {
    const pageOptions = {
      page: parseInt(body.page, 10) || 0,
      limit: parseInt(body.limit, 10) || 10,
    };
    const users = await User.find({
      type: body.type,
      _id: { $ne: body.id },
    });
    // .skip(pageOptions.page * pageOptions.limit)
    // .limit(pageOptions.limit);
    return users;
  };
}

module.exports = AuthService;
