import React, { useContext } from "react";
import Hi from "../../img/hi.svg";
import { BasicContext } from "../../context/BasicContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import Sidebar from "../../component/Sidebar";
import Button from "../../component/Button";
const Orders = () => {
  const navigate = useNavigate();
  const {orders} = useContext(BasicContext);
  if (window.location.pathname === "/orders") {
    document.body.style.backgroundColor = "#F9F8FF";
  }
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
                        <Button 
                          onClickFunction = {()=>{navigate(`/orders/${ord?._id}`)}}
                          text={"Expand"}
                        />
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

export default Orders;
