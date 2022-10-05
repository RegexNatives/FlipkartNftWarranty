import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BasicContext } from "../../context/BasicContext";
import { successToast, errorToast } from "../../utils/toast";

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

const AssignSellerModal = (props) => {
  const { open, setOpen } = props;
  const [address, setAddress] = React.useState("");

  const { assignSeller } = React.useContext(BasicContext);

  const handleSell = () => {
    console.log(address);
    if (address.length !== 42) {
      // alert("Please enter valid address");
      errorToast("Please enter valid address");
    } else {
      assignSeller(address)
        .then((res) => {
          if (res.errorStatus) {
            errorToast("Not Authorized");
          } else {
            successToast("Seller Assigned Successfully");
          }
          //   console.log(res);
          setOpen(false);
        })
        .catch((err) => {
          errorToast("Error Occured");
        });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-text">
            Please Enter the address you want to assign as Vendor.
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

export default AssignSellerModal;
