import React, { useEffect, useState } from "react";
import CartIcon from "../../img/cart.svg";
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { BasicContext } from "../../context/BasicContext";
import FilterIcon from "../../img/filter.svg";
import * as animationData from "../../animation/empty.json";
import Lottie from "react-lottie";
import { formatDate } from "../../utils/functions";
import Button from "../../component/Button";
import { getAllOrder } from "../../actions/order.actions";


const Orders = () => {
  const defaultOptions = {
    loop: true,

    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders } = useSelector((state) => state.products);
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("all");


  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  useEffect(() => {
    if (status !== "all") {
      // console.log(status);
      let newOrders = orders.filter((order) => order.orderStatus == status);
      setAllOrders(newOrders);
    }
    else{
      setAllOrders(orders);
    }
  }, [status]);


  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getProducts = async () => {
        dispatch(getAllOrder())
      }
      getProducts();
    }
    return () => {
      mounted = false;
    }
  },[])
const [toggleFilter, settoggleFilter] = useState(false)
  return (
    <div>
      <div className="shop-cart-wrap">
        <div className="shopping-cart-page">
          <h1>
            Your Orders List <img src={CartIcon} alt="" />
          </h1>
          <div onClick={()=>{
            settoggleFilter(!toggleFilter)
          }} className="filter-on-small-device">
            <img src={FilterIcon} alt="" />
            <p>Filters</p>
          </div>
          {toggleFilter?(
            <div className="toggle-filter-div">
          <div className="new-filter-panel | filter-panel">
             
              <h1>Filter by status</h1>
              <div className="filter-check">
                <div className="filter-check-1">
                  <p>All</p>
                  <input
                    type="radio"
                    name="status"
                    value="all"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Shipped</p>
                  <input
                    type="radio"
                    name="status"
                    value="Shipped"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Delivered</p>
                  <input
                    type="radio"
                    name="status"
                    value="Delivered"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Processing</p>
                  <input
                    type="radio"
                    name="status"
                    value="Processing"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          ):null}
          
          {/* <div className="shoping-cart-flex">
            <div className="filter-panel">
              <img src={FilterIcon} alt="" />
              <h1>Filter by status</h1>
              <div className="filter-check">
                <div className="filter-check-1">
                  <p>All</p>
                  <input
                    type="radio"
                    name="status"
                    value="all"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Shipped</p>
                  <input
                    type="radio"
                    name="status"
                    value="Shipped"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Delivered</p>
                  <input
                    type="radio"
                    name="status"
                    value="Delivered"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Processing</p>
                  <input
                    type="radio"
                    name="status"
                    value="Processing"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="cart-list">
              {allOrders?.map((order,index) => (
                <div className="cart-item" key={index}>
                  <img src={order?.orderItems?.image} alt="" />
                  <div className="cart-text-flex">
                    <div className="card-item-text">
                      <h1>{order?.orderItems?.name}</h1>
                      <div className="card-item-text">
                        <p>Quantity : 1</p>
                        <p>
                          Status : <span>{order?.orderStatus}</span>{" "}
                        </p>
                        <p>
                          Ordered ON :{" "}
                          <span>{formatDate(order?.createdAt)}</span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="card-item-price">
                      <p>{order?.orderItems?.price}</p>

                      <Button
                        onClickFunction={() => {
                          navigate("/order/" + order?._id);
                        }}
                        text={"Open Details"}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {allOrders.length === 0 && (
               ' No Orders Found'
              )}
            </div>
          </div> */}

          <div className="new-orders-page-flex">
             
            <div className="new-filter-panel | filter-panel">
            <img src={FilterIcon} alt="" />
              <h1>Filter by status</h1>
              <div className="filter-check">
                <div className="filter-check-1">
                  <p>All</p>
                  <input
                    type="radio"
                    name="status"
                    value="all"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Shipped</p>
                  <input
                    type="radio"
                    name="status"
                    value="Shipped"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Delivered</p>
                  <input
                    type="radio"
                    name="status"
                    value="Delivered"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
                <div className="filter-check-1">
                  <p>Processing</p>
                  <input
                    type="radio"
                    name="status"
                    value="Processing"
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="new-cart-list">
            {allOrders?.map((order,index) => (
                 <div className="new-cart-item" key={index}>
                  <div className="new-cart-img">
                    <img src={order?.orderItems?.image} alt="" />
                  </div>
                  <div className="new-cart-details">
                      <div className="new-cart-product-name">
                        <div  > {order?.orderItems?.name} </div>
                       <div  >  ₹{order?.orderItems?.price}</div>
                      </div>
                      <div className="new-cart-product-quantity">
                        Quantity : 1
                      </div>
                      <div className="new-cart-product-status">
                        Status : <span>{order?.orderStatus}</span>
                      </div>
                      <div className="new-cart-product-ordered-on">
                        Ordered ON : <span>{formatDate(order?.createdAt)}</span>
                      </div>
                      <Button  className="new-cart-button"
                        onClickFunction={() => {
                          navigate("/order/" + order?._id);
                        }}
                        text={"Open Details"}
                      />
                  </div>
                 </div>
              ))}
              {allOrders.length === 0 && (
              //  ' No Orders Found'
               <>
                <div className="no-orders-found">
                      No Orders Found
                      <div className="no-orders-found-lottie">
                      <Lottie options={defaultOptions} />
                      </div>
                  </div>
               </>
              )}
            </div>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Orders;
