import React, { useEffect, useState, useContext } from "react";
import OrderIcon from "../img/order.svg";
import { useParams } from "react-router-dom";
import { BasicContext } from "../context/BasicContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { formatDate } from "../utils/functions";
import { getWarrantyRequest, requestWarranty } from "../api/orders";
import storeAsset from "../utils/uploadNft"

const steps = ["Processing", "Shipped", "Delivered"];
const OrderDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState();
  const { orders, currentAccount } = useContext(BasicContext);
  const [warrantyRequest, setWarrantyRequest] = useState({});

  useEffect(() => {
    getWarrantyRequest(id)
      .then((res) => {
        setWarrantyRequest(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleWarranty = () => {
    if (currentAccount != null) {
      if (!warrantyRequest.status) {
        requestWarranty(
          product._id,
          id,
          currentAccount,
          "Dummy",
          "getWarranty"
        ).then((res) => {
          console.log(res);
          setWarrantyRequest({
            status: true,
            message: "Warranty status",
            data: res.data,
          });
        });
      }
      else if(warrantyRequest.status && warrantyRequest.data.status === "Minted"){
        requestWarranty(
          product._id,
          id,
          currentAccount,
          "Dummy",
          "revailWarranty"
        ).then((res) => {
          console.log(res);
          setWarrantyRequest({
            status: true,
            message: "Warranty status",
            data: res.data,
          });
        });
      }
    } else {
      alert("Please Connect to your wallet!");
    }
  };
  useEffect(() => {
    const ord = orders.find((order) => order._id === id);
    setProduct(ord?.orderItems);
    setOrder(ord);
    if (ord.orderStatus === "Delivered") {
      setStatus(2);
    } else if (ord.orderStatus === "Shipped") {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }, [id,orders]);

  if (window.location.pathname === "/order/" + id) {
    document.body.style.backgroundColor = "#F9F8FF";
  }

  const uploadNFT = () => { 
    
  }

  
  return (
    <>
      <div className="order-details-page">
        <h1>
          Order details <img src={OrderIcon} alt="" />{" "}
        </h1>
        <button onClick={()=>uploadNFT()}></button>
        <div className="order-details-container">
          <div className="order-img">
            <img src={product?.image} alt="" />
          </div>
          <div className="order-details-text">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            {/* <h2>Select color</h2> */}
            {/* <div className="color-details">
              <p>Selected color</p>
              <img src={Color} alt="" />
            </div> */}
            <div className="connect-btn" onClick={() => handleWarranty()}>
                  <div className="button-container">
                    <svg
                      width="236"
                      height="52"
                      viewBox="0 0 236 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M235 1H8.11246L1 9.33333V28.8846V50.5H9.5L235 51V1Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.1"
                      />
                    </svg>
                  </div>
                  <p className="absollute-btn-part">
                    {warrantyRequest?.status
                      ? warrantyRequest?.data.status === "Pending"
                        ? "Pending"
                        : "Revail"
                      : "Request"}
                  </p>
                  <div className="absollute-btn-part button-background">
                    <svg
                      width="234"
                      height="50"
                      viewBox="0 0 234 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M234 0H7.11246L0 8.33333V27.8846V49.5H8.5L234 50V0Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                {/* </div> */}
                {warrantyRequest?.status && warrantyRequest?.data?.status === "Minted"? (
                  <div className="connect-btn" onClick={() => handleWarranty()}>
                  <div className="button-container">
                    <svg
                      width="236"
                      height="52"
                      viewBox="0 0 236 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M235 1H8.11246L1 9.33333V28.8846V50.5H9.5L235 51V1Z"
                        fill="white"
                        stroke="black"
                        stroke-width="1.1"
                      />
                    </svg>
                  </div>
                  <p className="absollute-btn-part">
                    Resale
                  </p>
                  <div className="absollute-btn-part button-background">
                    <svg
                      width="234"
                      height="50"
                      viewBox="0 0 234 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M234 0H7.11246L0 8.33333V27.8846V49.5H8.5L234 50V0Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                ):(null)}
              </div>
            <div className="price-details">
              <h1>{product?.price}</h1>
              {/* <div className="btn-holder"> */}
                
            </div>
            <p className="qty">Quantity : 1</p>
            <div className="status-wrap">
              <div className="status-container">
                <div className="status-container-inner">
                  <p>Status</p>
                  <Box sx={{ width: "100%" }} style={{ marginTop: "0px" }}>
                    <Stepper activeStep={status} alternativeLabel>
                      {steps.map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </div>
              </div>
              <p>
                Your order has been {order?.orderStatus}{" "}
                {status == 2
                  ? "on " + formatDate(order?.deliveredAt)
                  : status == 1
                  ? "on " + formatDate(order?.shippedAt)
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
