import React from "react";
import {convertIPFSURL} from "../../utils/getNFT";
import Button from "../Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "600px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const NFTModal = (props) => {
    const {open,handleClose,nftProducts,loader,setSellModal,setSellToken} = props;
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-content">
          <h1 className="modal-text">Your Warranty NFTs</h1>
          <div className="nft-modal-list">
            {loader
              ? "Loading ...."
              : nftProducts?.map((item) => {
                  console.log(item.validUnitll);
                  let date = new Date(item.validUnitll * 1000);
                  let month = date.getMonth() + 1;
                  // console.log(item)
                  return (
                    <>
                      <div className="nft-modal-img">
                        <img
                          src={convertIPFSURL(item.image)}
                          alt={item.token}
                        />
                        <p style={{ position: "relative", top: "-60px" }}>
                          Valid Until :{" "}
                          {date.getDate() +
                            "/" +
                            month +
                            "/" +
                            date.getFullYear()}
                        </p>
                        <Button
                          onClickFunction={() => {
                            setSellModal(true);
                            setSellToken(item?.token);
                          }}
                          text={"Sell"}
                        />
                      </div>
                    </>
                  );
                })}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default NFTModal;
