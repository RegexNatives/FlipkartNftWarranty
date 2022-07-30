import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "./Button"; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BasicContext } from "../context/BasicContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SellModal = (props) => {
 
  const { open, setOpen, token,setParentModal } = props;
  const [address, setAddress] = React.useState("");

  const { sellNFT } = React.useContext(BasicContext);

  const handleSell = () => {
    console.log(token, address);
    if(address.length != 42){
        // alert("Please enter valid address");

        toast.error("Please enter valid address", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
    else{
      
        sellNFT(token, address).then((res) => {
          toast.success("Warranty Sold Succesfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
            console.log(res);
            setOpen(false);
            setParentModal(false);
        }).catch((err) => {
          toast.error("Error Occured", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
    }
  };

  return (
    <>
   {/* <button onClick={notify}>Notify!</button> */}
   <ToastContainer
          position="bottom-right"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="modal-text">
          Please Enter the address you want to send warranty to
        </h1>
        <input
          className="modal-input"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          type="text"
          placeholder="Address"
        />
        <div className="button-holder">
          <Button text={"Sell"} onClickFunction={handleSell} />
        </div>
      </Box>
    </Modal>

    </>
  );
};

export default SellModal;
