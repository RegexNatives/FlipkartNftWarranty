const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  hasWarranty: {
    type: Boolean,
    default: false,
  },
  warrantyPeriod: {
    type: Number, // make time period is in days
    default: 365,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderPlaced: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
