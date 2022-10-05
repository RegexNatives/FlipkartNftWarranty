const express = require("express");
const router = express.Router();

const auth = require("./auth.route");
const products = require("./products.route");
const order = require("./order.route");
const warranty = require("./warranty.route");
/* A comment. */
const otp = require("./otp.route");
const avail = require("./avail.route");

router.use("/auth", auth);
router.use("/products", products);
router.use("/order", order);
router.use("/warranty", warranty);
router.use("/avail", avail);
router.use("/otp", otp);

module.exports = router;
