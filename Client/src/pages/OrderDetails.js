import React, { useEffect, useState, useContext } from "react";
import OrderIcon from "../img/order.svg";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { BasicContext } from "../context/BasicContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { formatDate, renderActionButton } from "../utils/functions";
import { convertIPFSURL, getNFT } from "../utils/getNFT";
import { getWarrantyRequest, requestWarranty } from "../api/orders";
import Button from "../component/Button";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const steps = ["Processing", "Shipped", "Delivered"];
const OrderDetails = () => {
  const [nftProducts, setNFTProducts] = useState({});
  const [fetchdata, setFetchdata] = useState([]);
  const [uniqueId, setUniqueId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState();
  const { orders, currentAccount, fetchMyNFTs } = useContext(BasicContext);
  const [requestStatus, setRequestStatus] = useState({
    status: false,
  });
  const [revailStatus, setRevailStatus] = useState({
    status: false,
  });
  const [resaleStatus, setResaleStatus] = useState({
    status: false,
  });
  const [step, setStep] = useState(0);
  // console.log(requestStatus, revailStatus, resaleStatus);
  const [modalInput, setmodalInput] = useState("");
  const modalInputChange = (e) => {
    setmodalInput(e.target.value);
    // console.log(e.target.value);
  };
  useEffect(() => {
     
    getWarrantyRequest(id, "getWarranty")
      .then((res) => {
        setRequestStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    getWarrantyRequest(id, "revailWarranty")
      .then((res) => {
        setRevailStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    getWarrantyRequest(id, "resaleWarranty")
      .then((res) => {
        setResaleStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [step]);
  const handleWarranty = (type) => {
    if (type != "resaleWarranty") {
      requestWarranty(product._id, id, currentAccount, product.name, type)
        .then((res) => {
          console.log(res);
          toast.success("Requested Succesfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setStep(step + 1);
        })
        .catch((err) => {
          toast.error("Error Occured", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(err);
        });
    } else {
      setOpen(true);
    }
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

  useEffect(() => {
    console.log(currentAccount);
    if (currentAccount != null) {
      fetchMyNFTs().then((res) => {
        console.log(res, "fetchMyNFTs");
        setFetchdata(res);
      });
    }
  }, [currentAccount]);
  useEffect(() => { 
    if (fetchdata?.length > 0) {
      fetchdata?.map((item) => {
        console.log(item.uri, "productUri");
        if (item.uri != null) {
          if (uniqueId != null) {
            getNFT(item.uri)
              .then((res) => {
                // console.log(res?.attributes[1].uniqueId,res?.attributes[3].retailerId, "nft");
                // console.log(uniqueId,"uniqueId");
                if (
                  res?.attributes[1].uniqueId == uniqueId &&
                  res?.attributes[3].retailerId == order?.user
                ) {
                  // console.log("Hello")
                  setNFTProducts(res);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      });

      // getNFT(fetchdata[0]?.uri).then((res) => {
      //   // console.log(res, "conversion");
      //   // setNFTBlob(res);
      // });
    }
  }, [fetchdata, uniqueId]);
  useEffect(() => {
    if (nftProducts.length > 0) {
      console.log(nftProducts, "nftProducts");
    }
  }, [nftProducts]);
  if (window.location.pathname === "/order/" + id) {
    document.body.style.backgroundColor = "#F9F8FF";
  }

  return (
    <>
      <div className="mui-modal-revail">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="modal-text">
              Please Enter the address you want to send warranty to
            </h1>
            <input
              className="modal-input"
              onChange={modalInputChange}
              type="text"
              placeholder="Address"
            />
          </Box>
        </Modal>
      </div>
      <div className="order-details-page">
        <h1>
          Order details <img src={OrderIcon} alt="" />{" "}
        </h1>
        <div className="order-details-container">
          <div className="order-img">
            {nftProducts != null ? (
              <img src={convertIPFSURL(nftProducts?.image)} alt="" />
            ) : (
              <img src={product?.image} alt="" />
            )}
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
                  revailStatus,
                  resaleStatus,
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
