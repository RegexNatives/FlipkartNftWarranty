import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../../img/rect2.svg";
import Button from "../../component/Button";
import Rect from "../../img/rect.svg";
import { useNavigate, useParams } from "react-router";
import * as animationData2 from "../../animation/empty.json";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { formatDate } from "../../utils/functions";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { fetchNFTsMintedBy } from "../../actions/nft.actions";
import { convertIPFSURL } from "../../utils/getNFT";
import Loader from "../../component/Loader";

const NFTs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAccount, connectWallet } = useContext(BasicContext);
  const { myNFTs, loading } = useSelector((state) => state.warranty);

  const defaultOptions2 = {
    loop: true,

    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  //   console.log(myNFTs,loading)

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const connect = async () => {
        if (!currentAccount) {
          await connectWallet();
        }
      };
      connect();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    const getNFTs = async () => {
      if (mounted) {
        if (currentAccount) {
          dispatch(fetchNFTsMintedBy(currentAccount));
        }
      }
    };
    getNFTs();
  }, [currentAccount]);

  const ref = useRef();

  return (
    <>
      <div className="admin-page">
        <>
          <div className="admin-product-open-page admin-warranty-page-remove-flex">
            <div className="button-and-text">
              <h1>Customer Warranties &gt; </h1>
              <Button
                text="Change Account"
                onClickFunction={() => {connectWallet("reset")}}
              />
            </div>
            {loading ? (
              <Loader />
            ) : (
              <>
                <div className="noraml-div">
                  {myNFTs?.length > 0 &&
                    myNFTs?.map((item) => {
                      return (
                        <>
                        {/* <div className="nft-modal-img">
                          <img src={convertIPFSURL(item.image)} />
                          <div className="image-content">
                            
                            <Button
                              text={"View"}
                              onClickFunction={() => {
                                navigate("/warranties/" + item?.token);
                              }}
                            />
                          </div>
                        </div> */}

                        <div className="new-nft-img-container">
                            <img src={convertIPFSURL(item.image)} />
                            <button onClick={
                              ()=>{
                                navigate("/warranties/" + item?.token);
                              }
                            } >View</button>
                        </div>
                        </>
                      );
                    })}
                  {myNFTs?.length == 0 && 
                  (
                    <>
                    <div className="no-orders-found-lottie">
                      <Lottie options={defaultOptions2} />
                      </div>
                    </>
                  )
                  }

                </div>
              </>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default NFTs;
