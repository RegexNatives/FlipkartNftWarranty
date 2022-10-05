import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../../img/rect2.svg";
import Button from "../../component/Button";
import Rect from "../../img/rect.svg";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { formatDate } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchNFTsMintedBy,availWarranty } from "../../actions/nft.actions";
import { convertIPFSURL } from "../../utils/getNFT";
import {getAvailWarrantyStatus} from "../../actions/avail.actions";

const SingleWarranty = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.products);
  const { myNFTs,loading,availRequest } = useSelector((state) => state.warranty);

  const { currentAccount,connectWallet } = useContext(BasicContext);

  const [loader,setLoader] = useState(false);
  const [ currentNFT, setCurrentNFT ] = useState(null);

  
  const handleAvail = () => {
    setLoader(true);
    dispatch(availWarranty(connectWallet,currentNFT.token,availRequest?._id,setLoader));
  }



//   console.log(myNFTs,loading)


  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const connect = async () => {
        if(!currentAccount){
            await connectWallet();
        }
      }
      connect();
    }
    return () => {
      mounted = false;
    }
  },[])

  useEffect(() => {
    let mounted = true;
    const getNFTs = async () => {
        if (mounted) {
            if (currentAccount) {
                dispatch(fetchNFTsMintedBy(currentAccount));
            }
        }
    }
    if(myNFTs.length === 0){
        getNFTs();
    }
  },[currentAccount,myNFTs])


  useEffect(() => {
    let mounted = true;
    const getNFTs = async () => {
        if (mounted) {
            let currentNFT = myNFTs.find((nft) => nft.token == id);
            if(!currentNFT){
                navigate("/warranties");
            }
            currentNFT.date = new Date(currentNFT?.validUnitll * 1000);
            console.log(currentNFT)
            currentNFT.month = currentNFT.date.getMonth() + 1;
            dispatch(getAvailWarrantyStatus(currentNFT.token));
            setCurrentNFT(currentNFT);
        }
    }
    getNFTs();
  },[id])

  return (
    <>
      <div className="admin-page">
          <>
            <div className="admin-product-open-page warranty-page-single-warranty">
              <h1>{currentNFT?.name}  &gt; </h1>
                <div className="noraml-div single-nft">
                      {/* <div className="nft-modal-img">
                        <img src={convertIPFSURL(currentNFT?.image)} />
                        <div className="image-content">
                            <p>
                            Valid Until :{" "}
                            {currentNFT?.date.getDate() +
                                "/" +
                                currentNFT?.month +
                                "/" +
                                currentNFT?.date.getFullYear()}
                            </p>
                            <p>Availed : {currentNFT?.redemptionCount} / {currentNFT?.redemptionLimit}</p>
                            {availRequest?.token ? (
                              
                              <Button
                                  text={"Avail"}
                                  onClickFunction={() => {
                                      handleAvail();
                                  }}
                              />
                            ):(
                              null
                            )}
                        </div>
                      </div> */}

                      <div className="new-nft-img-container">
                      <img src={convertIPFSURL(currentNFT?.image)} />
                      <div className=" new-nft-img-container-valid-btn">
                            <p>
                            Valid Until :{" "}
                            {currentNFT?.date.getDate() +
                                "/" +
                                currentNFT?.month +
                                "/" +
                                currentNFT?.date.getFullYear()}
                            </p>
                            <p>Claimed : {currentNFT?.redemptionCount} / {currentNFT?.redemptionLimit}</p>
                            {availRequest?.token ? (
                              
                              // <Button
                              //     text={"Avail"}
                              //     onClickFunction={() => {
                              //         handleAvail();
                              //     }}
                              // />
                              <button onClick={()=>{
                                handleAvail();
                              }} >Claim</button>
                            ):(
                              null
                            )}
                        </div>
                      </div>
              </div>
            </div>
          </>
      </div>

  
    </>
  );
};

export default SingleWarranty;
