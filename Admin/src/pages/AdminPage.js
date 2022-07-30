import React, { useState, useEffect,useContext } from "react";
import Hi from "../img/hi.svg";
import CartIcon from "../img/cart.svg";
import { BasicContext } from "../context/BasicContext";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../api/orders";
import { formatDate } from "../utils/functions";
import Sidebar from "../component/Sidebar";
const AdminPage = () => {
  const navigate = useNavigate();
  // const [orders, setOrders] = useState([]);
  const {orders,setOrders} = useContext(BasicContext);
  // const {orders} = React.useContext(BasicContext);
  // console.log(orders);
  if (window.location.pathname === "/orders") {
    document.body.style.backgroundColor = "#F9F8FF";
  }
  const [sideLink, setsideLink] = useState(0);
  return (
    <>
      <div className="admin-page">
       <Sidebar />
        <div className="admin-page-container">
          <h1>
            Welcome Dhairya <img src={Hi} alt="" />{" "}
          </h1>
          <div className="admin-all-products-wrap">
            <h1>Products :</h1>
            <div className="admin-all-products-list">
              {orders?.map((ord) => (
                <div className="admin-product">
                  <div className="admin-product-wrap">
                    <div className="admin-product-inner">
                      <div className="admin-product-img">
                        <img src={ord?.orderItems?.image} alt="" />
                      </div>
                      <div className="admin-product-details">
                        <h1>{ord?.orderItems?.name}</h1>
                        <p>
                          Status : <span> {ord?.orderStatus}</span>{" "}
                        </p>
                        <p>
                          Per item : <span>{ord?.orderItems?.price}</span>{" "}
                        </p>
                        <p>
                          Ordered On : <span>{formatDate(ord?.createdAt)}</span>{" "}
                        </p>
                         
                      </div>
                      <div className="admin-product-btn">
                        <div onClick={()=>{navigate(`/orders/${ord?._id}`)}}  className="connect-btn">
                          <div className="button-container">
                            <svg
                              width="150"
                              height="49"
                              viewBox="0 0 150 49"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M149 1L5.49848 1L1 8.83333L1 27.2115L1 47.53H6.37607L149 48V1Z"
                                fill="white"
                                stroke="black"
                                stroke-width="0.909721"
                              />
                            </svg>
                          </div>
                          <p className="absollute-btn-part">Expand</p>
                          {/* <button>Connect Wallet</button> */}
                          <div className="absollute-btn-part button-background">
                            <svg
                              width="148"
                              height="47"
                              viewBox="0 0 148 47"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M148 0L4.49848 0L0 7.83333L0 26.2115L0 46.53H5.37607L148 47V0Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
