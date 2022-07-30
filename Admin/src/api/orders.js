import axios from "axios";
import { apiURL } from "../config";
export const getAllOrders = async () => {
  const orders = await axios.get(apiURL + "order/all");
  return orders.data;
};

export const getWarrantyRequest = async (orderId,type) => {
  const warranty = await axios.get(apiURL + "warranty/status/" + orderId+"/"+type);
  return warranty.data;
};
// export const getStatus = async (orderId) => {
//   const status = await axios.get(apiURL + "/status/" + orderId);
//   return warranty.data;
// };
export const updateStatus = async (orderId, status) => {
  console.log(orderId, status);
    const update=await axios.put(apiURL + "order/status/" + orderId, {
        status: status
    });
    return update.data;
}
export const requestWarranty = async (productId,orderId,customerWallet,description,type) => {
    // console.log(productId,orderId,customerWallet,description);
  const warranty = await axios.post(apiURL + "warranty/create", {
    productId,
    orderId,
    customerWallet,
    description,
    type,
  });
  return warranty.data;
};

export const changeWarrantyStatus = async (warrantyId, status) => {
  const warranty = await axios.put(apiURL + "warranty/status/" + warrantyId, {
    status: status,
  });
  return warranty.data;
}
