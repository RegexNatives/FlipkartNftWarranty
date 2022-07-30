import React,{useEffect,useState} from "react";
import CartIcon from "../img/cart.svg";
import { useNavigate } from "react-router-dom";
import { BasicContext } from "../context/BasicContext";
import FilterIcon from "../img/filter.svg";
import { formatDate } from "../utils/functions";
const Orders = () => {
  // const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const {orders} = React.useContext(BasicContext);
    if(window.location.pathname === "/orders"){
        document.body.style.backgroundColor = '#F9F8FF';
    }
  return (
    <div  >
       
      <div className="shop-cart-wrap">
      <div className="shopping-cart-page">
        <h1>
          Your Orders List <img src={CartIcon} alt="" />
        </h1>
        <div className="shoping-cart-flex">
          <div className="filter-panel">
            <img src={FilterIcon} alt="" />
            {/* <h1>Filter by price</h1>
            <div className="filter-check">
              <div className="filter-check-1">
                <p>low to high</p>
                <input type="checkbox" />
              </div>
              <div className="filter-check-1">
                <p>high to low</p>
                <input type="checkbox" />
              </div>
            </div> */}
            <h1>Filter by status</h1>
            <div className="filter-check">
              <div className="filter-check-1">
                <p>Shipped</p>
                <input type="radio" name="status" />
              </div>
              <div className="filter-check-1">
                <p>Delivered</p>
                <input type="radio" name="status" />
              </div>
              <div className="filter-check-1">
                <p>Processing</p>
                <input type="radio" name="status" />
              </div>
            </div>
          </div>
          <div className="cart-list">
            {orders?.map((order) => (
            <div className="cart-item">
                <img src={order?.orderItems?.image} alt="" />
                <div className="cart-text-flex">
                <div className="card-item-text">
                    <h1>{order?.orderItems?.name}</h1>
                    <div className="card-item-text">

                    <p>Quantity :  {order?.orderItems?.qty}</p>
                    <p>Status : <span>{order?.orderStatus}</span> </p>
                    <p>Ordered ON : <span>{formatDate(order?.createdAt)}</span> </p>
                    </div>
                </div>
                <div className="card-item-price">
                    <p>{order?.orderItems?.price}</p>
                    <div className="connect-btn">
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
                  <p className="absollute-btn-part" onClick={()=>navigate("/order/"+order?._id)}>Open Details</p>
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
                <div className="cart-item-background"></div>
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
