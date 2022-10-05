const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    type: {
      type: String,
      default: "user",
      enum: ["superAdmin", "admin", "vendor", "user"],
    },
    walletAddress: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

// {
// 	shippingInfo: {
// 	  address: "House No. 157 Moh Neel Khudana Sikhola Chowk Jwalapur",
// 	  city: "Haridwar",
// 	  state: "UK",
// 	  country: "IN",
// 	  pincode: 249407,
// 	  phoneNo: 8449129069,
// 	},
// 	paymentInfo: {
// 	  id: "20220724111212800110168631303907828",
// 	  status: "TXN_SUCCESS",
// 	},
// 	_id: "62dd5d9c23ed77d3be77e849",
// 	orderItems:
// 	  {
// 		name: "Apple iPhone 12",
// 		price: "$999",
// 		image: "",
// 		description:
// 		  "This is the new Apple iPhone 12 with extra and astonishing new feautures",
// 		_id: "62e287083a6a1f39982ed8a1",
// 		qty: 1,
// 	  },
// 	user: "62dd1695fe702a25e7766fa9",
// 	paidAt: "2022-07-24T14:56:28.297Z",
// 	totalPrice: 499,
// 	orderStatus: "Delivered",
// 	shippedAt: "2022-07-22T14:56:28.297Z",
// 	deliveredAt: "2022-07-24T14:56:28.297Z",
// 	createdAt: "2022-07-21T14:56:28.301Z",
// 	__v: 0,
//   },
