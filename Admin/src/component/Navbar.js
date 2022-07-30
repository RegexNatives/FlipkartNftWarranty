import React, { useEffect, useState, useContext } from "react";
import AdminIcon from "../img/admin.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { convertIPFSURL, getNFT } from "../utils/getNFT";
import { BasicContext } from "../context/BasicContext";
import Button from "./Button";
import { toast } from "react-toastify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "700px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [nftProducts, setNFTProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const { fetchNFTsMintedBy } = useContext(BasicContext);
  const [fetchdata, setFetchdata] = useState([]);
  const {
    currentAccount,
    connectWallet,
    setCurrentAccount,
    assignSeller,
    availNFT,
  } = React.useContext(BasicContext);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
    } else {
      if (currentAccount == null) {
        connectWallet();
      }
    }
  }, [currentAccount]);
  const walletConnection = () => {
    if (currentAccount == null) {
      connectWallet();
    } else {
      setCurrentAccount(null);
    }
  };
  const as = () => {
    assignSeller().then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    if (currentAccount != null) {
      fetchNFTsMintedBy().then((res) => {
        console.log(res);
        setFetchdata(res);
      });
    }
  }, [currentAccount]);

  const fetchNFTsMintedBys = async () => {
    console.log("Hello");
    handleOpen();
    setNFTProducts([]);
    console.log(fetchdata);
    fetchdata?.map((item, index) => {
      console.log(item?.uri);
      if (item.uri != null) {
        getNFT(item.uri)
          .then((res) => {
            const nft = {
              image: res.image,
              name: res.name,
              token: parseInt(item.tokenId._hex, 16),
              validUnitll : parseInt(item.validUntil._hex, 16),
            };
            // if(checkUniqueNft(res)){
            setNFTProducts((nftProducts) => [...nftProducts, nft]);
            setLoader(false);
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (index == fetchdata.length - 1) {
        setLoader(false);
      }
    });
  };

  const validateNFT = (token) => {
    console.log(token)
    availNFT(token).then((res) => {
      console.log(res);
      if(res.errorStatus == true){
       toast.error("Warranty Expired !",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       });
      }
      else{
        toast.success("Warranty Valid !",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    });
  };
  return (
    <>
      <div
        className={
          window.location.pathname === "/admin" ? "fixednav navbar" : "navbar"
        }
      >
        <div className="nav-logo">
          <svg
            width="71"
            height="32"
            viewBox="0 0 71 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H13.248C16.896 0 19.776 0.288 21.888 0.864C24 1.408 25.552 2.368 26.544 3.744C27.536 5.12 28.032 7.024 28.032 9.456V22.128C28.032 24.496 27.568 26.336 26.64 27.648C25.712 28.928 24.192 29.84 22.08 30.384C19.968 30.896 17.04 31.152 13.296 31.152H0V0ZM12.96 25.824C15.008 25.824 16.544 25.744 17.568 25.584C18.624 25.392 19.376 25.04 19.824 24.528C20.304 24.016 20.544 23.216 20.544 22.128V9.312C20.544 7.84 19.952 6.816 18.768 6.24C17.616 5.632 15.76 5.328 13.2 5.328H7.488V25.824H12.96Z"
              fill="black"
            />
            <path
              d="M34.0781 0H44.7341L52.4141 22.272L59.9981 0H70.0301V31.152H63.2621V8.112H63.1181L55.2461 31.152H49.2461L41.1341 8.112H40.9421V31.152H34.0781V0Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="nav-link">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              fetchNFTsMintedBys();
            }}
          >
            Warranties
          </a>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="modal-content">
              <h1 className="modal-text">Warranties Minted By You</h1>
              {nftProducts.length > 0 ? (
                 <div className="nft-modal-list">
                 {loader
                   ? null
                   : nftProducts?.map((item) => {
                       let date = new Date(item.validUnitll * 1000);
                      let month  = date.getMonth()+1;
                       return (
                         <>
                           <div className="nft-modal-img">
                             <img src={convertIPFSURL(item.image)} />
                             <p>Valid Until : {date.getDate() +"/"+month+"/"+date.getFullYear()}</p>
                             <Button
                               text={"Validate"}
                               onClickFunction={() => {
                                 validateNFT(item?.token);
                               }}
                             />
                           </div>
                         </>
                       );
                     })}
               </div>
              ):(
                "Loading"
              )}
             
            </Box>
          </Modal>
        </div>
        {window.location.pathname === "/admin" ? (
          <>
            <div className="admin-profile">
              <img src={AdminIcon} alt="" />
              <h1>Dhairya Marwah</h1>
            </div>
          </>
        ) : (
          <>
            <div
              className="connect-btn"
              onClick={() => {
                walletConnection();
              }}
            >
              <div className="button-container">
                <svg
                  width="236"
                  height="52"
                  viewBox="0 0 236 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M235 1H8.11246L1 9.33333V28.8846V50.5H9.5L235 51V1Z"
                    fill="white"
                    stroke="black"
                    stroke-width="1.1"
                  />
                </svg>
              </div>
              <p className="absollute-btn-part">
                {currentAccount == null ? "Connect Wallet" : "Signout"}
              </p>
              <p className="wallet-Add">{currentAccount}</p>
              <div className="absollute-btn-part button-background">
                <svg
                  width="234"
                  height="50"
                  viewBox="0 0 234 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M234 0H7.11246L0 8.33333V27.8846V49.5H8.5L234 50V0Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
