import React, { useEffect, useState, useContext } from "react";
import OrderIcon from "../../img/order.svg";
import { useNavigate, useParams } from "react-router-dom";
import {successToast, errorToast} from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../component/Button";
import { getAllProducts } from "../../actions/products.actions";
import CreateOrder from "../../component/Modals/Order";
import { createOrderAction } from "../../actions/order.actions";


const Product = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { loggedIn } = useSelector((state) => state.user);

  const [product, setProduct] = useState({});
  const [ orderModal , setOrderModal ] = useState(false);

    useEffect(() => {
        const ord = products.find((product) => product._id === id);
        setProduct(ord);
        if(products.length == 0){
            dispatch(getAllProducts())
        }
    },[id,products])


  const handleBuyNow = () => {
    if(!loggedIn){
        navigate('/login');
        return;
    }
    setOrderModal(true);
  }


  const createAnOrder = (values) =>{
    values.vendor = product.vendor;
    // console.log(values);
    dispatch(createOrderAction(values,setOrderModal,navigate));
    // setOrderModal(false);
  }

  return (
    <>
      <div className="order-details-page">
        <h1 >
          Product details <img src={OrderIcon} alt="" />{" "}
        </h1>
        <div className="order-details-container">
          <div className="order-img">
              <img src={product?.image} alt="" />
          </div>
          <div className="order-details-text">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <div className="price-details">
              <h1>₹{product?.price}</h1>
            </div>
            <div className="buy-now">
                <Button
                    onClickFunction={()=> handleBuyNow()}
                    text={'Buy Now'}
                />
            </div>
          </div>
        </div>
        <CreateOrder open={orderModal} setOpen={setOrderModal} productId={id}  submitFunction={createAnOrder} />
      </div>
    </>
  );
};

export default Product;
