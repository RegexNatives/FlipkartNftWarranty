import  axios  from "axios";
import {apiURL} from "../config";
export const getAllProducts = async () => {
    const products = await axios.get(
        apiURL + "products/all"
    );
    return products.data;
};
export const getOneProduct = async (id) => {
    const products = await axios.get(
        apiURL + "order/products/"+id
    );
    return products.data;
};
 
