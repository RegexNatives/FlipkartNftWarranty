import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { convertIPFSURL } from "../../utils/getNFT";
import Button from "../Button";
import { errorToast, successToast } from "../../utils/toast";
import { BasicContext } from "../../context/BasicContext";

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

const NFTModal = (props) => {

  const { availNFT } = React.useContext(BasicContext);
  const { open, handleClose, nftProducts, loader } = props;

  const validateNFT = (token) => {
    console.log(token);
    availNFT(token).then((res) => {
      console.log(res);
      if (res.errorStatus == true) {
        errorToast("Warranty Expired !");
      } else {
        successToast("Warranty Valid !");
      }
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        size="small"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-content">
          <h1 className="modal-text">Warranties Minted By You</h1>
        </Box>
      </Modal>
    </>
  );
};

export default NFTModal;
