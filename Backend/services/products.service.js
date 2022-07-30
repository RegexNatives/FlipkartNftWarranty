require("dotenv").config();
const createError = require("http-errors");
const {Product} = require("../models");

class Products{
    static getAllProducts = async () => {
        const prod = await Product.find();
        return prod;
    }
}

module.exports = Products;
