const jwt = require("../utils/jwt");
const createError = require("http-errors");
const auth = async (req, res, next) => {
  if (req.headers.authorization == undefined) {
    console.log("No token found");
    return next(createError(401, "No token found"));
    // return next(createError.Unauthorized("Access token is required"));
  }
  // console.log(req.headers.authorization);
  const token = req.headers?.authorization.split(" ")[1];
  if (!token) {
    return next(createError.Unauthorized("Access token is required"));
  }

  await jwt
    .verifyAccessToken(token)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => {
      res.status(401).json({ message: "Invalid Token" });
    });
};

module.exports = auth;