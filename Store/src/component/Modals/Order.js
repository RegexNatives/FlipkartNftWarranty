import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { BasicContext } from "../../context/BasicContext";
import { successToast, errorToast } from "../../utils/toast";
import { useFormik } from "formik";
import { orderValidation } from "../../utils/validators";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateOrder = (props) => {
    
  const { open, setOpen,productId,submitFunction } = props;

  const formik = useFormik({
    initialValues: {
      shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "India",
        pincode: "",
      },
      paymentInfo: {
        id: "202207241112128001101686313121211118",
        status: "TXN_SUCCESS",
      },
      orderItems: "",
    },
    validationSchema: orderValidation,
    onSubmit: (values) => {
      values.orderItems  = productId;
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
          <h1 className="modal-text">Please Enter Details</h1>
          <div className="modal-inputs">
            <div className="row">
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="Address"
                    id="shippingInfo.address"
                    name="shippingInfo.address"
                    value={formik.values.shippingInfo.address}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.shippingInfo?.address &&
                  formik.touched.shippingInfo?.address ? (
                    <p className="error">
                      {formik.errors.shippingInfo?.address}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="City"
                    id="shippingInfo.city"
                    name="shippingInfo.city"
                    value={formik.values.shippingInfo.city}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.shippingInfo?.city &&
                  formik.touched.shippingInfo?.city ? (
                    <p className="error">
                      {formik.errors.shippingInfo?.city}
                    </p>
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
                    id="shippingInfo.state"
                    name="shippingInfo.state"
                    value={formik.values.shippingInfo.state}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.shippingInfo?.state &&
                  formik.touched.shippingInfo?.state ? (
                    <p className="error">
                      {formik.errors.shippingInfo?.state}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="col-6">
                <div className="login-input">
                  <input
                    type="text"
                    placeholder="Pincode"
                    id="shippingInfo.pincode"
                    name="shippingInfo.pincode"
                    value={formik.values.shippingInfo.pincode}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.shippingInfo?.pincode &&
                  formik.touched.shippingInfo?.pincode ? (
                    <p className="error">
                      {formik.errors.shippingInfo?.pincode}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="button-holder">
            <Button text={"Proceed"} onClickFunction={formik.handleSubmit} />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CreateOrder;
