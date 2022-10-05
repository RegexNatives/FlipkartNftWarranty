import React, { useEffect, useState, useContext } from "react";
import OrderIcon from "../../img/order.svg";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BasicContext } from "../../context/BasicContext";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { formatDate, renderActionButton } from "../../utils/functions";
// import { getWarrantyRequest } from "../../api/orders";
import RequestWarranty from "../../component/Modals/RequestWarranty";
import {successToast, errorToast} from "../../utils/toast";
import { useSelector } from "react-redux";
import { getAllOrder } from "../../actions/order.actions";
import { createWarrantyRequestAction, getWarrantyRequest } from "../../actions/warranty.actions";
const steps = ["Processing", "Shipped", "Delivered"];


const OrderDetails = () => {
  
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { warrantyRequest }  = useSelector((state) => state.warranty);
  const { orders } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);

  const {currentAccount,connectWallet} = useContext(BasicContext);

  const [status, setStatus] = useState();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [warrantyModal,setWarrantyModal] = useState(false);
  
  const [step, setStep] = useState(0);
  useEffect(() => {
    let mounted = true;
    const warrantyRequest = async () => {
      if(mounted){
        dispatch(getWarrantyRequest(id));
      }
    }
    warrantyRequest();
    return () => {
      mounted = false;
    }
  }, [step,id]);

  const handleWarranty = (type) => {
    setWarrantyModal(true);
  };

  useEffect(() => {
    let mounted = true;
    const getOrders = () => {
      if(mounted){
        if(orders.length == 0){
          dispatch(getAllOrder());
        }
      }
    }
    getOrders();
    return () => {
      mounted = false;
    }
  }, [orders]);

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
  },[id])

  const createRequestWarranty = (values) =>{
    values.vendorId = order.vendor;
    dispatch(createWarrantyRequestAction(values,setWarrantyModal));
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
          </div>
          <div className="order-details-text">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <div className="price-details">
              <h1>₹{product?.price}</h1>
              <p className="qty">Quantity : 1</p>
              <div className="btn-holder">
                {renderActionButton(
                  order?.orderStatus,
                  warrantyRequest,
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
        <RequestWarranty user={user} orderId={id} validTill={product?.warrantyPeriod} productId={product._id} open={warrantyModal} setOpen={setWarrantyModal} submitFunction={createRequestWarranty} connectWallet={connectWallet} currentAccount={currentAccount} />
      </div>
    </>
  );
};

export default OrderDetails;
