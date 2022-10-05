import React, { useContext,useEffect,useState } from "react";
import Hi from "../../img/hi.svg";
import { BasicContext } from "../../context/BasicContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/functions";
import Sidebar from "../../component/Sidebar";
import * as animationData2 from "../../animation/empty.json";
import Lottie from "react-lottie";
import Button from "../../component/Button";
import { useDispatch,useSelector } from "react-redux";
import { getAllOrder } from "../../actions/order.actions";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user);
  const { orders } = useSelector((state) => state.products);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);
  const defaultOptions2 = {
    loop: true,

    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
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


  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <h1>
            Welcome {user?.name} <img src={Hi} alt="" />{" "}
          </h1>
          <div className="admin-all-products-wrap">
            <h1>Orders :</h1>
            {/* <div className="admin-all-products-list">
            {allOrders.length==0 &&('No Orders Found!')}
              {allOrders?.map((ord) => (
                <div className="admin-product">
                  <div className="admin-product-wrap">
                    <div className="admin-product-inner">
                      <div className="admin-product-img">
                        <img src={ord?.orderItems?.image} alt="" />
                      </div>
                      <div className="details-and-button">
                      <div className="admin-product-details">
                        <h1>{ord?.orderItems?.name}</h1>
                        <p>
                          Buyer : <span> {ord?.buyer?.name}</span>{" "}
                        </p>
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
                          onClickFunction = {()=>{navigate(`/order/${ord?._id}`)}}
                          text={"Expand"}
                        />
                      </div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

               
            </div> */}


          <div className="new-cart-list">
          {allOrders.length==0 &&('No Orders Found!')}
              {allOrders?.map((order,index) =>(
                <>
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
                        Buyer : <span>{order?.buyer?.name}</span>
                      </div>
                      <div className="new-cart-product-status">
                        Status : <span>{order?.orderStatus}</span>
                      </div>
                      <div className="new-cart-product-ordered-on">
                        Ordered ON : <span>{formatDate(order?.createdAt)}</span>
                      </div>
                      <Button  className="new-cart-button"
                      onClickFunction = {()=>{navigate(`/order/${order?._id}`)}}
                        text={"Expand"}
                      />
                  </div>
                 </div>
                </>
              )

               )}
          </div>

            {/* <div className="new-cart-list">
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
                      <Lottie options={defaultOptions2} />
                      </div>
                  </div>
               </>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
