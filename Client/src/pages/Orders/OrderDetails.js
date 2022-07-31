import React, { useEffect, useState, useContext } from "react";
import OrderIcon from "../../img/order.svg";
import { useParams } from "react-router-dom";
import { BasicContext } from "../../context/BasicContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { formatDate, renderActionButton } from "../../utils/functions";
import { getWarrantyRequest, requestWarranty } from "../../api/orders";
import {successToast, errorToast} from "../../utils/toast";
const steps = ["Processing", "Shipped", "Delivered"];
const OrderDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState();
  const { orders, currentAccount } = useContext(BasicContext);
  const [requestStatus, setRequestStatus] = useState({
    status: false,
  });
  const [step, setStep] = useState(0);
  useEffect(() => {
    getWarrantyRequest(id, "getWarranty")
      .then((res) => {
        setRequestStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [step]);
  const handleWarranty = (type) => {
      requestWarranty(product._id, id, currentAccount, product.name, type)
        .then((res) => {
          // console.log(res);
          successToast("Requested warranty");
          setStep(step + 1);
        })
        .catch((err) => {
          errorToast("Error in requesting warranty");
          console.log(err);
        });
  };
  useEffect(() => {
    const ord = orders.find((order) => order._id === id);
    setProduct(ord?.orderItems);
    setOrder(ord);
    if (ord?.orderStatus === "Delivered") {
      setStatus(2);
    } else if (ord?.orderStatus === "Shipped") {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }, [id, orders]);

  if (window.location.pathname === "/order/" + id) {
    document.body.style.backgroundColor = "#F9F8FF";
  }

  return (
    <>
      <div className="order-details-page">
        <h1 >
          Order details <img src={OrderIcon} alt="" />{" "}
        </h1>
        <div className="order-details-container">
          <div className="order-img">
              <img src={product?.image} alt="" />
            <img src={product?.image} alt="" />
          </div>
          <div className="order-details-text">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <div className="price-details">
              <h1>{product?.price}</h1>
              <p className="qty">Quantity : 1</p>
              <div className="btn-holder">
                {renderActionButton(
                  order?.orderStatus,
                  requestStatus,
                  handleWarranty
                )}
              </div>
            </div>

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
