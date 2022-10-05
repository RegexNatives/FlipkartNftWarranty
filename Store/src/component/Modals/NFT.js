import React, { useEffect, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { BasicContext } from "../../context/BasicContext";
import { getAllUserAction } from "../../actions/auth.actions";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpAction, verifyOtpAction } from "../../actions/sell.actions";
import { useNavigate } from "react-router";
import { createAvailWarrantyRequest, getAvailWarrantyRequest } from "../../actions/avail.actions";
import { fetchMyNFTs, sellNFTAction, validateNFT } from "../../actions/nft.actions";
import SellModal from "./SellModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding:100,
  p: 4,
};

const NFTModal = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { currentAccount, resetWallet,connectWallet } = useContext(BasicContext);
  const { availRequest,nftSold,reloadWarranties } = useSelector((state) => state.warranty);


  const [sellModal , setSellModal] = useState(false);


  const { open, setOpen, token, NFT } = props;


  const handleValidateNFT = async () => {
    // console.log(currentNFT);
    await connectWallet("reset");
    dispatch(validateNFT(NFT?.token));
  };
  const handleAvailWarranty = () => {
    let requestData = {
        token : NFT?.token,
        vendor : NFT.vendorId,
        buyerName : user?.name,
        email : user?.email,
        phone : user?.phone,
        warrantyName : NFT?.name,
    }
    // console.log(requestData);
    dispatch(createAvailWarrantyRequest(requestData));
  }

  const handleSell = async () =>{
    setSellModal(true);
    // await connectWallet();
    // console.log(currentAccount)
    // dispatch(sellNFTAction(NFT?.token,"0x1df8c8a6b5342ca40dd9205cc75a1acdac41deb3",setOpen,""))
  }


  useEffect(() => {
    let mounted = true;
    const addDate = async () => {
        if (mounted) {
          // console.log(NFT);
          if(NFT?.validUnitll){
            NFT.date = new Date(NFT?.validUnitll * 1000);
            NFT.month = NFT.date.getMonth() + 1;
            NFT.year = NFT.date.getFullYear();
            NFT.day = NFT.date.getDate();
            dispatch(getAvailWarrantyRequest(NFT?.token));
          }
        }
    }
    addDate();
    return () => {
        mounted = false;
    }
  },[NFT])

  useEffect(() => {
    let mounted = true;
    const changeModal = async () => {
        if (mounted) {
          console.log(reloadWarranties);
          if(reloadWarranties == "Yes"){
            setOpen(false);
            dispatch({
              type: "SET_MY_NFT",
              payload: [],
            })
            await connectWallet();
            setTimeout(() => {
              dispatch(fetchMyNFTs());
            }, 1000);
            dispatch({
              type: "RELOAD_WARRANTIES",
              payload: false,
            })
            window.location.reload(false);
          }
        }
    }
    changeModal();
    return () => {
        mounted = false;
    }
  },[reloadWarranties])

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-inputs nft-modal">
            <div className="row">
              <div className="col-6">
                <div className="class-image">
                  <img src={NFT?.image} className="nft-image box-shadow" />
                </div>
              </div>
              <div className="col-6">
                <div className="align-modal-right">
                    <h3 className="warranty-name">{NFT?.name?.split("Warranty")[1]}</h3>
                    <div className="sub-text"> Valid Till {"->"} {NFT?.day}/{NFT?.month}/{NFT?.year}</div>
                    <div className="sub-text"> Claimed {"->"} {NFT?.redemptionCount} / {NFT?.redemptionLimit}</div>
                    <div className="mynft-logout-btn" onClick={()=>{handleValidateNFT()}}>
                      <button className="primary">Validate</button>
                    </div>
                    <p className="desc"> {NFT?.description}</p>
                    <div className="two-buttons">
                      {availRequest?.token?('Claim Request Pending'):(
                              <div className="mynft-logout-btn" onClick={()=>{handleAvailWarranty()}}>
                                <button className="primary">Claim</button>
                              </div>
                            )}
                      
                      <div className="mynft-logout-btn" onClick={()=>{handleSell()}}>
                        <button className="primary">Sell</button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <SellModal open={sellModal} setOpen={setSellModal} token={NFT?.token}  productName={NFT?.name} />
        </Box>
      </Modal>
    </>
  );
};

export default NFTModal;
