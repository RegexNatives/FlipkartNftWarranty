require("dotenv").config();
const { WarrantyRequest, Product, User } = require("../models");

class Warranty {
  static createWarranty = async (data) => {
    const product = await Product.findOne({ _id: data.productId });
    const vendor = await User.findOne({ _id: product.vendor });

    data.validTill = product.warrantyPeriod;
    const warranty = await WarrantyRequest.create({
      ...data,
    });

    let vendorMail = {
      email: vendor.email,
      subject: "Warranty Request",
      message: `Warranty has been requested for product ${product.name} by ${data.buyerName} and order id: ${data.orderId}`,
    };
    // console.log(vendorMail,data);
    return { warranty, vendorMail };
  };
  static getWarrantyStatus = async (orderId) => {
    const warranty = await WarrantyRequest.findOne({ orderId });
    return warranty;
  };
  static updateWarrantyStatus = async (id, status) => {
    const warranty = await WarrantyRequest.findByIdAndUpdate(id, { status });
    return warranty;
  };

  static getWarrantyRequests = async (id) => {
    const warranty = await WarrantyRequest.find({
      vendorId: id,
      $and: [{ status: "Pending" }],
    });

    const pd = new Set();
    for (let i = 0; i < warranty.length; i++) {
      pd.add(warranty[i].productId);
    }

    const result = [];
    for (let i of pd) {
      let temp = await WarrantyRequest.find({
        productId: i,
        $unset: { productId: 1 },
        $and: [{ status: "Pending" }],
      });

      let obj = {};
      let prod = await Product.findOne({ _id: i });
      prod = prod._doc;
      console.log(prod);
      obj = { ...prod, requests: temp };
      result.push(obj);
    }

    return result;
  };
}

module.exports = Warranty;
