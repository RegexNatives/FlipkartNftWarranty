import React, { useContext, useState, useEffect, useRef } from "react";
import Lottie from "react-lottie";
import { sha1 } from "crypto-hash";
import { FileUploader } from "react-drag-drop-files";
import {
  exportComponentAsPNG,
  exportComponentAsJPEG,
} from "react-component-export-image";
import ShadowUser from "../../img/shadow-user.svg";
import Flipkart from "../../img/flipkart.svg";
import { errorToast } from "../../utils/toast";
import Button from "../../component/Button";
import Edit from "../../img/edit.svg";
import { useParams } from "react-router";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { storeAsset } from "../../utils/uploadNft";
import { formatDate } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../actions/order.actions";
import { getWarrantyRequestStatus } from "../../actions/warranty.actions";
import { createNFTAction } from "../../actions/nft.actions";
import domtoimage from "dom-to-image";

const fileTypes = ["PNG", "JPG", "JPEG"];

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentAccount, connectWallet } = useContext(BasicContext);
  const { orders } = useSelector((state) => state.products);
  const { warrantyRequest } = useSelector((state) => state.warranty);

  const [nftBlob, setNFTBlob] = useState(null);
  const [uniqueId, setUniqueId] = useState(null);

  const [order, setOrder] = useState({});
  const [isDownload, setDownload] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (file) => {
    setNFTBlob(file);
  };

  const getUniqueId = async (data) => {
    let uniId = await sha1(data);
    return uniId;
    // setUniqueId(uniId);
  };

  const downloadImage = () => {
    domtoimage
      .toJpeg(document.getElementById("get-nft-image"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${order?.orderItems?.name}.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  };

  // console.log(uniqueId)

  const MintNFT = async () => {
    let assetData = {
      name: order?.orderItems?.name,
      description: order?.orderItems?.description,
      imagePath: nftBlob,
      uniqueId: uniqueId,
      deliveredAt: formatDate(order?.deliveredAt),
      retailerId: order?.vendor,
      price: order?.orderItems?.price,
    };
    if (nftBlob != null) {
      if (!currentAccount) {
        await connectWallet();
      }
      console.log(currentAccount);
      setLoader(true);
      storeAsset(assetData)
        .then((res) => {
          let nftData = {
            receiver: warrantyRequest?.data?.walletAddress,
            tokenURI: res.url,
            minutesValid: parseInt(warrantyRequest?.data?.validTill) * 24 * 60,
            orderId: order?._id,
            warrantyId: warrantyRequest?.data?._id,
            currentAccount: currentAccount,
          };

          dispatch(createNFTAction(connectWallet, nftData, setLoader));
        })
        .catch((err) => {
          setLoader(false);
          errorToast("Unable to store the warranty");
        });
    } else {
      errorToast("Please upload NFT image");
    }
  };

  const callupdate = (orderid, status) => {
    dispatch(updateOrderStatus(id, status));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getProducts = async () => {
        const ord = orders.find((order) => order._id === id);
        setOrder(ord);
        dispatch(getWarrantyRequestStatus(ord?._id));
        setUniqueId(await getUniqueId(ord?._id));
      };
      getProducts();
    }
    return () => {
      mounted = false;
    };
  }, [orders, id]);

  const ref = useRef();

  return (
    <>
      <div className="admin-page single-order-page">
        {loader ? (
          <>
            <div className="lottie-loader">
              <Lottie options={defaultOptions} />
            </div>
          </>
        ) : (
          <>
            <div className="admin-product-open-page">
              <div className="single-order-page-order-img">
                <h1>Order &gt; </h1>
                <img src={order?.orderItems?.image} alt="" />
              </div>
              <div className="single-order-page-information">
                <div className="single-order-page-informatioheader">
                  <h1>Iphone 12 Pro</h1>
                </div>
                <div className="single-order-page-shipping">
                  <p>Order Status : </p>
                  <div className="single-order-page-shipping-select">
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
                </div>
                <div className="single-order-page-other">
                  <p>
                    Customer Address :{" "}
                    <span>
                      {" "}
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
                    Product ID : <span> {order?.orderItems?._id}</span>
                  </p>
                  <p>
                    Customer Name : <span> {order?.buyer?.name}</span>
                  </p>
                  <p>
                    Phone Number : <span> {order?.buyer?.phone}</span>
                  </p>
                  <p>
                    Order on : <span> {formatDate(order?.createdAt)} </span>
                  </p>
                </div>

                {warrantyRequest?.status &&
                warrantyRequest?.data?.status == "Pending" ? (
                  <div className="mint-main-div">
                    {isDownload ? (
                      <>
                        <div className="file-uploader">
                          <FileUploader
                            handleChange={handleChange}
                            name="file"
                            types={fileTypes}
                          />
                          {/* <Button
                                onClickFunction={() => MintNFT()}
                                text={"Mint"}
                              /> */}

                          <div
                            onClick={() => {
                              MintNFT();
                            }}
                            className="single-order-page-download single-order-page-download-mint"
                          >
                            <button> Mint NFT</button>
                            <svg
                              width="67"
                              height="64"
                              viewBox="0 0 67 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0H56.1872C61.6191 0 66.0225 4.40341 66.0225 9.83529V54.1647C66.0225 59.5966 61.6191 64 56.1872 64H0V0Z"
                                fill="#9830EA"
                              />
                              <path
                                d="M32.479 41.8848V23.0144M32.479 23.0144L40.9766 31.3302M32.479 23.0144L24.635 31.3302"
                                stroke="white"
                                stroke-width="2.58045"
                              />
                            </svg>
                          </div>
                        </div>

                        <span className=" select-text">
                          Select the downloaded Image to continue
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="download-button">
                          <div
                            onClick={() => {
                              downloadImage();
                              setDownload(true);
                            }}
                            className="single-order-page-download"
                          >
                            <button>Download to Mint NFT</button>
                            <svg
                              width="67"
                              height="64"
                              viewBox="0 0 67 64"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M0 0H56.1872C61.6191 0 66.0225 4.40341 66.0225 9.83529V54.1647C66.0225 59.5966 61.6191 64 56.1872 64H0V0Z"
                                fill="#9830EA"
                              />
                              <path
                                d="M33.1324 23.0137V41.884M33.1324 41.884L24.6348 33.5683M33.1324 41.884L40.9763 33.5683"
                                stroke="white"
                                stroke-width="2.58045"
                              />
                            </svg>
                          </div>
                        </div>
                        {/* <span>Download to MINT NFT</span> */}
                      </>
                    )}
                  </div>
                ) : null}
                {warrantyRequest?.status &&
                  warrantyRequest?.data?.status == "Minted" && (
                    <div style={{ marginTop: 120, marginLeft: 20 }}>
                      Check the Warranty into Warranties
                    </div>
                  )}
              </div>
              {/* <div className="admin-product-open-order-list">
                <div className="admin-product-open-order-wrap">
                  <>
                    <div className="admin-product-open-order-inner">
                      <div className="admin-product-open-order-img">
                        <img src={order?.orderItems?.image} alt="" />
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
                          Product ID : <span> {order?.orderItems?._id}</span>
                        </p>
                        <p>
                          Customer Name : <span> {order?.buyer?.name}</span>
                        </p>
                        <p>
                          Phone Number : <span> {order?.buyer?.phone}</span>
                        </p>
                        <p>
                          Order on :{" "}
                          <span> {formatDate(order?.createdAt)} </span>
                        </p>
                      </div>
                    </div>
                    {warrantyRequest?.status &&
                    warrantyRequest?.data?.status == "Pending" ? (
                      <div className="mint-main-div">
                        {isDownload ? (
                          <>
                            <div className="file-uploader">
                              <FileUploader
                                handleChange={handleChange}
                                name="file"
                                types={fileTypes}
                              />
                              <Button
                                onClickFunction={() => MintNFT()}
                                text={"Mint"}
                              />
                            </div>

                            <span className=" select-text">
                              Select the downloaded Image to continue
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="download-button">
                              <Button
                                onClickFunction={() => {
                                   
                                  downloadImage()
                                  setDownload(true);
                                }}
                                text={"Download"}
                              />
                            </div>
                            <span>Download to MINT NFT</span>
                          </>
                        )}
                      </div>
                    ) : null}
                    {warrantyRequest?.status &&
                      warrantyRequest?.data?.status == "Minted" && (
                        <div style={{ marginTop: 120, marginLeft: 20 }}>
                          Check the Warranty into Warranties
                        </div>
                      )}
                  </>
                 
                </div>
              </div> */}
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
        <div className="new-nft-card" id="get-nft-image">
          <div className="price-pill">
            <p>₹{order?.orderItems?.price}</p>
          </div>
          <div className="my-new-nft-img">
            <img src={order?.orderItems?.image} alt="" />
          </div>
          <div className="my-new-nft-details">
            <div className="my-new-nft-user">
              <img src={ShadowUser} alt="" />
            </div>
            <div className="my-new-nft-user-text">
              <div className="my-new-nft-name">{order?.orderItems?.name}</div>
              <div className="my-new-nft-delivered">
                <div className=""> Bought on {"->"}</div>
                <div className="">{formatDate(order?.createdAt)}</div>
                {/* Bought on {'->'} Sat, 03 Sep 2022 */}
              </div>
              <div className="my-new-nft-delivered">
                <div className="">Unique Id {"->"}</div>
                <div className="">
                  {uniqueId?.slice(0, uniqueId?.length / 2)}{" "}
                  {uniqueId?.slice(uniqueId?.length / 2 + 1, uniqueId?.length)}
                </div>
                {/* Unique Id     {'->'} f07c55576aba89ab1ab3f0ee 0b4b6a19a0bd093c */}
              </div>
              <div className="my-new-nft-delivered">
                <div className="">Vendor Id {"->"} </div>
                <div className="">{order?.vendor}</div>
                {/* Vendor Id     -> f07c55576aba89ab1ab3f0ee 0b4b6a19a0bd093c */}
              </div>
              <div className="flipkart-logo">
                <img src={Flipkart} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
