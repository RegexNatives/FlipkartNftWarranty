import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { BasicContext } from "../../context/BasicContext";
import { successToast, errorToast } from "../../utils/toast";
import { useFormik } from "formik";
import { requestWarrantyValidation } from "../../utils/validators";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateWarranty = (props) => {
  const { user, orderId,productId,validTill, open,currentAccount,connectWallet, setOpen, submitFunction } = props;
  // console.log(user)

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      walletAddress: !currentAccount?user?.walletAddress:currentAccount,
      orderId: orderId,
      // vendor : 
    },
    validationSchema: requestWarrantyValidation,
    enableReinitialize: true,
    onSubmit: (values) => {
      values.productId = productId;
      values.buyerName = values.name
      delete values.name;
      submitFunction(values);
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="modal-text">Please Verify Details</h1>
          <div className="modal-inputs">
            <div className="row">
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.name &&
                  formik.touched.name ? (
                    <p className="error">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="City"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.email &&
                  formik.touched.email ? (
                    <p className="error">{formik.errors.email}</p>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="State"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.phone &&
                  formik.touched.phone ? (
                    <p className="error">{formik.errors.phone}</p>
                  ) : null}
                </div>
              </div>
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="Valid Till"
                    id="validity"
                    name="validity"
                    value={`Validity : ${validTill} Days`}
                    disabled
                  />
                  <div className="input-behind"></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="login-input ">
                  <input
                    type="text"
                    placeholder="Wallet Address"
                    id="walletAddress"
                    name="walletAddress"
                    value={formik.values.walletAddress}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                    <p className="error disclaimer">
                      This Wallet address is of when you registered you can connect the present browser wallet as well
                    </p>
                </div>
              </div>
              <div className="col-6 connect-button connect-wallet-btn">
                 <Button
                    text={"Change Wallet"}
                    onClickFunction={()=>{connectWallet("reset")}}
                  />
              </div>
            </div>
          </div>

          <div className="button-holder">
            <Button text={"Request"} onClickFunction={formik.handleSubmit} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CreateWarranty;
