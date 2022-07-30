const express = require("express");
const router = express.Router();

const auth = require("./auth");
const products = require("./products");
const order = require("./order");
const warranty = require("./warranty");
router.use("/auth", auth);
router.use("/products",products);
router.use("/order",order);
router.use("/warranty",warranty);

module.exports = router;