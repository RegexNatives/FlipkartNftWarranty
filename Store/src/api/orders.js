import axios from "axios";
import { apiURL } from "../config";
export const getAllOrders = async () => {
  const orders = await axios.get(apiURL + "order/all");
  return orders.data;
};

export const getWarrantyRequest = async (orderId,type) => {
  const warranty = await axios.get(apiURL + "warranty/status/" + orderId);
  return warranty.data;
};

export const requestWarranty = async (productId,orderId,customerWallet,description,type) => {
    console.log(productId,orderId,customerWallet,description);
  const warranty = await axios.post(apiURL + "warranty/create", {
    productId,
    orderId,
    customerWallet,
    description,
    type,
  });
  return warranty.data;
};
