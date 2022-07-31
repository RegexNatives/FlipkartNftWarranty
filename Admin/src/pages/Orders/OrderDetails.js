import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../../img/rect2.svg";
import Lottie from "react-lottie";
import { sha1 } from "crypto-hash";
import { FileUploader } from "react-drag-drop-files";
import { exportComponentAsPNG } from "react-component-export-image";
import {successToast , errorToast} from "../../utils/toast";
import Button from "../../component/Button";
import Rect from "../../img/rect.svg";
import Sidebar from "../../component/Sidebar";
import Edit from "../../img/edit.svg";
import { useParams } from "react-router";
import {
  updateStatus,
  getWarrantyRequest,
  changeWarrantyStatus,
} from "../../api/orders";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { storeAsset } from "../../utils/uploadNft";
import { formatDate } from "../../utils/functions";

const fileTypes = ["PNG"];

const defaultOptions = {
  loop: true,

  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const OrderDetails = () => {
  const id = params?.id;
  const [nftBlob, setNFTBlob] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const { orders, setOrders, createNFT } = useContext(BasicContext);
  const [order, setOrder] = useState({});
  const [isDownload, setDownload] = useState(false);
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const [requestStatus, setRequestStatus] = useState({
    status: false,
  });


  const handleChange = (file) => {
    setNFTBlob(file);
  };
  
  useEffect(() => {
    const ord = orders.find((order) => order._id === id);
    setOrder(ord);

    getWarrantyRequest(id, "getWarranty")
      .then((res) => {
        // console.log(res,"getWarrantyRequest");
        setRequestStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    if (order?.orderItems?._id) {
      getUniqueId().then((res) => {
        setUniqueId(res);
      });
    }
  }, [id, orders]);

  const getUniqueId = async () => {
    let uniId = await sha1(order?.orderItems?._id);
    return uniId;
    // setUniqueId(uniId);
  };


  const MintNFT = async () => {
    if (nftBlob !== null) {
      setLoader(true);
      // console.log(nftBlob);
      storeAsset(
        order?.orderItems?.name,
        order?.orderItems?.description,
        order?.orderItems?.price,
        uniqueId,
        formatDate(order?.createdAt),
        order?.user,
        nftBlob
      )
        .then((res) => {
          // console.log(res);
          console.log("TO Wallet : ",requestStatus?.data?.customerWallet)
          createNFT({
            receiver: requestStatus?.data?.customerWallet,
            tokenURI: res.url,
            minutesValid: 365*24*60,
            // minutesValid: 1,
          })
            .then((res) => {
              console.log(res);
              if (res.errorStatus) {
                setLoader(false);
                errorToast("Not Authorized");
              } else {
                changeWarrantyStatus(requestStatus?.data?._id, "Minted")
                  .then((res) => {
                    successToast("Warranty Minted Successfully");
                    // console.log(res);
                    setRequestStatus({
                      ...requestStatus,
                      data: { ...requestStatus.data, status: "Minted" },
                    });
                    setLoader(false);
                  })
                  .catch((err) => {
                    setLoader(false);

                errorToast("Cannot Update the status");
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setLoader(false);
              errorToast("Unable to Mint the NFT");
            });
        })
        .catch((err) => {
          setLoader(false);
          errorToast("Unable to store the data");
        });
    } else {
      errorToast("Please upload NFT image");
    }
  };
  // useEffect(() => {
  const callupdate = (orderid, status) => {
    updateStatus(orderid, status)
      .then((res) => {
        successToast("Status Updated Successfully");
        let index = orders.findIndex((item) => item.id === orderid);
        let oldOrder = [...orders];
        let currOrder = order;
        currOrder.orderStatus = status;
        oldOrder[index] = currOrder;
        setOrders(oldOrder);
      })
      .catch((err) => {
        console.log(err);
        errorToast("Error Occured");
      })
  };

  if (window.location.pathname === "/orders/" + id) {
    document.body.style.backgroundColor = "#F9F8FF";
  }

  const ref = useRef();
  return (
    <>
      <div className="admin-page">
       <Sidebar/>
        {loader ? (
          <>
            <div className="lottie-loader">
              <Lottie options={defaultOptions} />
            </div>
          </>
        ) : (
          <>
            <div className="admin-product-open-page">
              <h1>All-products &gt; Iphone</h1>
              <div className="admin-product-open-order-list">
                <div className="admin-product-open-order-wrap">
                  <>
                    <div className="admin-product-open-order-inner">
                      <div className="admin-product-open-order-img">
                        <img src={order?.orderItems?.image} alt="" />
                        {requestStatus?.status &&
                        requestStatus?.data?.status == "Pending" ? (
                          <div style={{ width: "50%" }}>
                            {isDownload ? (
                              <>
                                <FileUploader
                                  handleChange={handleChange}
                                  name="file"
                                  types={fileTypes}
                                />

                                <Button
                                  onClickFunction={() => MintNFT()}
                                  text={"Mint"}
                                  className="minting-btn"
                                />
                                <span className="absolute-img-text">
                                  Select the downloaded Image to continue
                                </span>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClickFunction={() => {
                                    exportComponentAsPNG(ref);
                                    setDownload(true);
                                  }}
                                  text={"Download"}
                                />
                                <span>Download to MINT NFT</span>
                              </>
                            )}
                          </div>
                        ) : null}
                      </div>
                      <div className="admin-product-open-order-details">
                        <div className="order-status-open-order">
                          <p>Order Status : </p>
                          <select
                            disabled={
                              order?.orderStatus === "Delivered" ? true : false
                            }
                            name="select"
                            id="select"
                            value={order?.orderStatus}
                            onChange={(e) => {
                              callupdate(order?._id, e.target.value);
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped"> Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                          <img src={Edit} alt="" />
                        </div>
                        <p>
                          Customer Address :{" "}
                          <span>
                            {" "}
                            {/* {console.log(order)} */}
                            {order?.shippingInfo?.address +
                              ", " +
                              order?.shippingInfo?.city +
                              ", " +
                              order?.shippingInfo?.state +
                              ", " +
                              order?.shippingInfo?.pincode}
                          </span>
                        </p>
                        <p>
                          Product ID : <span> {order?.productId}</span>
                        </p>
                        <p>
                          Customer Name : <span> {"Vansh Patpatia"}</span>
                        </p>
                        <p>
                          Phone Number :{" "}
                          <span> {order?.shippingInfo?.phoneNo}</span>
                        </p>
                        <p>
                          Order on :{" "}
                          <span> {formatDate(order?.createdAt)} </span>
                        </p>
                      </div>
                    </div>
                  </>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div
        id="NFT-container"
        ref={ref}
        style={{ padding: "20px", paddingTop: "40px", paddingBottom: "0px" }}
        className="order-page-mint"
      >
        <div className="new-product">
          <img src={Rect} alt="" />
          <img className="rect2" src={Rect2} alt="" />
          <div className="product-img">
            <img src={order?.orderItems?.image} alt="" />
          </div>
          <div className="new-product-inner">
            <div className="new-product-inner-layer">
              <div className="product-text">
                <p>{order?.orderItems?.name}</p>
                <div className="price-product">
                  <p>
                    Price <span>{order?.orderItems?.price}</span>
                  </p>
                  <p>
                    Bought On <span>{formatDate(order?.createdAt)}</span>
                  </p>
                  <p>
                    <span>{order?.orderItems?._id}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
