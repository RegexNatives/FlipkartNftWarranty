import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../../img/rect2.svg";
import Button from "../../component/Button";
import Rect from "../../img/rect.svg";
import { useParams } from "react-router";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { formatDate } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyNFTs,sellNFTAction,validateNFT } from "../../actions/nft.actions";
import {convertIPFSURL} from "../../utils/getNFT";
import {createAvailWarrantyRequest,getAvailWarrantyRequest} from "../../actions/avail.actions";
import SellModal from "../../component/Modals/SellModal";

const SingleWarranty = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { myNFTs,loading,availRequest } = useSelector((state) => state.warranty);
  
  const { currentAccount,connectWallet,resetWallet } = useContext(BasicContext);

  const [ currentNFT, setCurrentNFT ] = useState(null);
  const [sellModal , setSellModal] = useState(false);

  const handleValidateNFT = async() => {
    // console.log(currentNFT);
    await connectWallet("reset");
    dispatch(validateNFT(currentNFT.token));
  };

  const handleAvailWarranty = () => {
    let requestData = {
        token : currentNFT.token,
        vendor : currentNFT.vendorId,
        buyerName : user?.name,
        email : user?.email,
        phone : user?.phone,
        warrantyName : currentNFT.name,
    }
    // console.log(requestData);
    dispatch(createAvailWarrantyRequest(requestData));
  }

  const handleSellWarranty  = async () => {
    setSellModal(true);
    // await connectWallet();
    // console.log(currentAccount)
    // dispatch(sellNFTAction(currentNFT?.token,"0x1df8c8a6b5342ca40dd9205cc75a1acdac41deb3",setSellModal,""))
    // console.log(currentNFT);
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
                dispatch(fetchMyNFTs());
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
            let currNft = myNFTs.find((nft) => nft.token == id);
            currNft.date = new Date(currNft.validUnitll * 1000);
            currNft.month = currNft.date.getMonth() + 1;
            dispatch(getAvailWarrantyRequest(currNft?.token));
            setCurrentNFT(currNft);
        }
    }
    getNFTs();
  },[id])

  
  return (
    <>
      <div className="admin-page">
          <>
            <div className="admin-product-open-page">
              <h1>{currentNFT?.name}  &gt; </h1>
                <div className="noraml-div single-nft">
                      <div className="nft-modal-img">
                        <img src={currentNFT?.image} />
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
                            <Button
                              text={"Validate"}
                              onClickFunction={() => {
                                handleValidateNFT();
                              }}
                            />
                            {availRequest?.token?('Avail Request Pending'):(
                                <Button
                                    text={"Avail"}
                                    onClickFunction={() => {
                                        handleAvailWarranty();
                                    }}
                                />
                            )}
                            <Button
                              text={"Sell"}
                              onClickFunction={() => {
                                handleSellWarranty();
                              }}
                            />
                        </div>
                      </div>
              </div>
            </div>
            <SellModal open={sellModal} setOpen={setSellModal} token={id}  productName={currentNFT?.name} />
          </>
      </div>

  
    </>
  );
};

export default SingleWarranty;
