require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");
const { User } = require("../models");

class AuthService {
  static register = async data => {
    const { email,password,name,phone} = data;

      let test_user = await User.find({ email:email });
      if (test_user.email) {
        throw createError.BadRequest("Id taken");
      }
    let pass = bcrypt.hashSync(data.password, 8);
    let user = await User.create({
      email: email,
      password: pass,
      name: name,
      phone: phone
    });
    data.accessToken = await jwt.signAccessToken(user);
    return data;
  };

  static resetPassword = async (data) => {
    
  }

  static login = async (data) => {
    const { email, password } = JSON.parse(JSON.stringify(data));

    const user = await User.findOne({ email: email });
    if (!user) {
      throw createError.BadRequest("User not found");
    }

    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      throw createError.Unauthorized("Passwords dont match");
    }
    delete user.password;
    const accessToken = await jwt.signAccessToken(user._doc,{expiresIn:'48h'});
    return { ...user._doc, accessToken };
  };

  

  static all = async () => {
    // return "hi";
    const allUsers = await User.find();

    return allUsers;
  };
}

module.exports = AuthService;
