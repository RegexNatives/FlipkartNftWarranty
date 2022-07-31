import React, { useEffect, useState } from "react";
import CartIcon from "../../img/cart.svg";
import { useNavigate } from "react-router-dom";
import { BasicContext } from "../../context/BasicContext";
import FilterIcon from "../../img/filter.svg";
import { formatDate } from "../../utils/functions";
import Button from "../../component/Button";
const Orders = () => {
  const navigate = useNavigate();
  const { orders } = React.useContext(BasicContext);
  const [allOrders, setAllOrders] = useState([]);
  const [status, setStatus] = useState("all");
  if (window.location.pathname === "/orders") {
    document.body.style.backgroundColor = "#F9F8FF";
  }
  useEffect(() => {
    // console.log(orders);
    setAllOrders(orders);
  }, [orders]);
  useEffect(() => {
    if (status !== "all") {
      // console.log(status);
      let newOrders = orders.filter((order) => order.orderStatus == status);
      setAllOrders(newOrders);
    }
  }, [status]);
  return (
    <div>
      <div className="shop-cart-wrap">
        <div className="shopping-cart-page">
          <h1>
            Your Orders List <img src={CartIcon} alt="" />
          </h1>
          <div className="shoping-cart-flex">
            <div className="filter-panel">
              <img src={FilterIcon} alt="" />
              <h1>Filter by status</h1>
              <div className="filter-check">
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
              {allOrders?.map((order) => (
                <div className="cart-item">
                  <img src={order?.orderItems?.image} alt="" />
                  <div className="cart-text-flex">
                    <div className="card-item-text">
                      <h1>{order?.orderItems?.name}</h1>
                      <div className="card-item-text">
                        <p>Quantity : {order?.orderItems?.qty}</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
