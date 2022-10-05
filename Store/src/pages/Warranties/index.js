import React, { useContext, useState, useEffect, useRef } from "react";
import Rect2 from "../../img/rect2.svg";
import Button from "../../component/Button";
import MyWarranty from "../../img/mywarranty.svg";
import ShadowUser from "../../img/shadow-user.svg";
import MetaMask from "../../img/metamask.svg";
import NewIphone from "../../img/new-iphone.svg";
import Flipkart from "../../img/flipkart.svg";
import Rect from "../../img/rect.svg";
import { useNavigate, useParams } from "react-router";
import * as animationData from "../../animation/loader.json";
import { BasicContext } from "../../context/BasicContext";
import { formatDate } from "../../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import * as animationData2 from "../../animation/empty.json";
import Lottie from "react-lottie";
import { fetchMyNFTs,validateNFT } from "../../actions/nft.actions";
import { convertIPFSURL } from "../../utils/getNFT";
import Loader from "../../component/Loader";
import NFTModal from "../../component/Modals/NFT";

const NFTs = () => {
  const defaultOptions2 = {
    loop: true,

    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentAccount, connectWallet } = useContext(BasicContext);
  const { user } = useSelector((state) => state.user);
  const { myNFTs, loading,nftSold } = useSelector((state) => state.warranty);

  const [viewModal, setViewModal] = useState(false);
  const [currentNft , setCurrentNft] = useState(null);


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
        if (currentAccount || nftSold) {
          dispatch(fetchMyNFTs());
        }
      }
    };
    getNFTs();
  }, [currentAccount,nftSold]);

  const ref = useRef();

  return (
    <>
      <div className="admin-page">
        <>
          <div className="new-my-wrranty-page">
            <div className="my-warrnaty-page-header">
              <img src={MyWarranty} alt="" />
              <div className="my-nft-page-flex">
                <div className="mynft-user-component">
                  <div className="user-details-flex">
                    <img src={ShadowUser} alt="" />
                    <div className="user-details">
                    <div className="user-name">
                      {user?.name}
                    </div>
                    
                    <div className="user-mail">
                      {user?.email}
                    </div>
                    <div className="user-wallet">
                     <img src={MetaMask} alt="" /> 
                     <p>{currentAccount?.slice(0,21)} {currentAccount?.slice(22,42)}</p> 
                    </div>
                    </div>
                     
                    </div>
                    <div className="mynft-logout-btn" onClick={()=>{connectWallet("reset")}}>
                      {/* <button>Logout</button> */}
                      <button className="primary">Change  Account</button>
                    </div>
                </div>
                <div className="my-nft-all-warranty">
                  <h1>Your Warranties</h1>
                  <div className="all-nfts-container">
                    {myNFTs?.length > 0 &&
                      myNFTs?.map((item,idx) => {
                        return (
                          <div className="nft-modal-img" onClick={()=>{setCurrentNft(item);setViewModal(true)}} key={idx}>
                            <img src={item.image} />
                            <div className="image-content">
                            
                            </div>
                          </div>
                        );
                      })}
                      {loading && (
                        <div className="loader-minimize">

                        <Loader />
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NFTModal open={viewModal} setOpen={setViewModal} NFT={currentNft} />
        </>
      </div>
    </>
  );
};

export default NFTs;