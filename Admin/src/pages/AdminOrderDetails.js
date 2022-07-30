import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../img/rect2.svg";
import Lottie from "react-lottie";
import { sha1 } from "crypto-hash";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FileUploader } from "react-drag-drop-files";
import { exportComponentAsPNG } from "react-component-export-image";

import Button from "../component/Button";
import Rect from "../img/rect.svg";
import Sidebar from "../component/Sidebar";
import Edit from "../img/edit.svg";
import { useParams } from "react-router";
import {
  updateStatus,
  getWarrantyRequest,
  changeWarrantyStatus,
} from "../api/orders";
import * as animationData from "../animation/loader.json";
import { BasicContext } from "../context/BasicContext";
import { storeAsset } from "../utils/uploadNft";
import { formatDate } from "../utils/functions";
import { convertIPFSURL, getNFT } from "../utils/getNFT";

const fileTypes = ["PNG"];
const AdminOrderDetails = () => {
  const [file, setFile] = useState(null);
  const [nftBlob, setNFTBlob] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);
  const handleChange = (file) => {
    setFile(file);
    setNFTBlob(file);
  };
  const defaultOptions = {
    loop: true,

    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { orders, setOrders, createNFT, fetchNFTsMintedBy, currentAccount } =
    useContext(BasicContext);
  const [order, setOrder] = useState({});
  const [fetchdata, setFetchdata] = useState([]);

  const [isDownload, setDownload] = useState(false);
  const [loader, setLoader] = useState(false);
  const [nftProducts, setNFTProducts] = useState({});
  const params = useParams();
  const id = params?.id;
  const [requestStatus, setRequestStatus] = useState({
    status: false,
  });
  const [revailStatus, setRevailStatus] = useState({
    status: false,
  });
  const [resaleStatus, setResaleStatus] = useState({
    status: false,
  });
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
    getWarrantyRequest(id, "revailWarranty")
      .then((res) => {
        // console.log(res,"revailWarranty");
        setRevailStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    getWarrantyRequest(id, "resaleWarranty")
      .then((res) => {
        // console.log(res,"resaleWarranty");
        setResaleStatus({ status: res.status, data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("hello");
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

  useEffect(() => {
    if (currentAccount != null) {
      fetchNFTsMintedBy().then((res) => {
        // console.log(res, "fetchNFTsMintedBy");
        setFetchdata(res);
      });
    }
  }, [currentAccount]);
  // console.log(order?.user,"retailerId");

  const [uriData, setUriData] = useState("");

  // console.log(fetchdata, "fetchdata");
  useEffect(() => {
    if (fetchdata.length > 0) {
      fetchdata?.map((item) => {
        // console.log(item.uri,"productUri")
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
    }
  }, [fetchdata, uniqueId]);
  useEffect(() => {
    if (nftProducts.length > 0) {
      console.log(nftProducts, "nftProducts");
    }
  }, [nftProducts]);
  // console.log(uriData?.uri, "fetchdata");
  // console.log(uriData, "uriData");
  const transferWarranty = () => {};

  const MintNFT = async () => {
    if (nftBlob !== null) {
      setLoader(true);
      // let uniqueId = uniqueId
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
          console.log(requestStatus?.data?.customerWallet,"TO Wallet")
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
                toast.error("Not Authorized !", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              } else {
                changeWarrantyStatus(requestStatus?.data?._id, "Minted")
                  .then((res) => {
                    // console.log(res);
                    toast.success("Warranty Minted Succesfully", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    setRequestStatus({
                      ...requestStatus,
                      data: { ...requestStatus.data, status: "Minted" },
                    });
                    setLoader(false);
                  })
                  .catch((err) => {
                    setLoader(false);

                    toast.error("Error Occured", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setLoader(false);

              toast.error("Error Occured", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        })
        .catch((err) => {
          setLoader(false);

          toast.error("Error Occured", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      alert("Please upload NFT image");
    }
  };
  // useEffect(() => {
  const callupdate = (orderid, status) => {
    updateStatus(orderid, status)
      .then((res) => {
        console.log(res);
        toast.success("Status Updated Succesfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        let index = orders.findIndex((item) => item.id === orderid);
        let oldOrder = [...orders];
        let currOrder = order;
        currOrder.orderStatus = status;
        oldOrder[index] = currOrder;
        setOrders(oldOrder);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  if (window.location.pathname === "/orders/" + id) {
    document.body.style.backgroundColor = "#F9F8FF";
  }
  const [sideLink, setsideLink] = useState(0);

  const ref = useRef();
  return (
    <>
      <ToastContainer
        position="bottom-right"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                        {/* {nftProducts!=null?(

                          <img src={convertIPFSURL(nftProducts?.image)} alt="" />
                        ):( */}
                        <img src={order?.orderItems?.image} alt="" />
                        {/* )} */}
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
                                {/* <input
                              type="image"
                              placeholder="Upload NFT"
                              accept="image/x-png"
                              onChange={(e) => {
                                setNFTBlob(e.target.files[0]);
                              }}
                            /> */}

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
                            // onClick={() => {setChangeSelect(true)}}
                            // value={item.orderStatus}
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
                        {/* <p>
                    Wallet Address :{" "}
                    <span> 0xDF0A39EF6593F3A3b9a05404Ade53Fd1c78188d2</span>
                  </p> */}
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

                        {/* {requestStatus?.status &&
                    requestStatus?.data.status == "Minted" ? (
                      <Button
                        onClickFunction={() => handleWarranty("revailWarranty")}
                        text={"Avail"}
                      />
                    ) : null} */}
                        {resaleStatus?.status &&
                        resaleStatus?.data.status == "Pending" ? (
                          <Button
                            onClickFunction={() => transferWarranty()}
                            text={"Transfer Warranty"}
                          />
                        ) : null}
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
                {/* <p>
                  {
                  order?.orderItems?.description}
                </p> */}
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
          <div className="new-product-background"></div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderDetails;
