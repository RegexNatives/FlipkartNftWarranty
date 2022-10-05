import React, { useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "../Button";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { BasicContext } from "../../context/BasicContext";
import { getAllUserAction } from "../../actions/auth.actions";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { sendOtpAction,verifyOtpAction } from "../../actions/sell.actions";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SellModal = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers, otp, sellWallet,buyerId } = useSelector((state) => state.user);

  const {currentAccount,resetWallet} = useContext(BasicContext);

  const { open, setOpen, submitFunction, token, productName } = props;


  const formik = useFormik({
    initialValues: {
      productName: productName,
      userId: "",
      token: token,
      walletAddress: "",
      // vendor :
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(sendOtpAction(values));
    },
  });


  const otpFormik = useFormik({
    initialValues: {
      otp: "",
      userId : buyerId,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      // setOpen(false);
      dispatch(verifyOtpAction(values,token,sellWallet,setOpen,resetWallet,navigate));
    }
  })

  useEffect(() => {
    let mounted = true;
    const getAllUsers = async () => {
      if (mounted) {
        dispatch(getAllUserAction());
      }
    };
    getAllUsers();
    return () => {
      mounted = false;
    };
  }, []);

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
                  {otp?(
                    <div className="col-6">
                      <div className="login-input">
                        <input
                          type="text"
                          placeholder="Enter Otp"
                          id="otp"
                          name="otp"
                          value={otpFormik.values.otp}
                          onChange={otpFormik.handleChange}
                        />
                        <div className="input-behind"></div>
                      </div>
                    </div>
                  ):(
                    <>
                      <Select
                        options={allUsers?.map((user) => {
                          return {
                            value: user?._id,
                            label: user?.email,
                            walletAddress: user.walletAddress,
                          };
                        })}
                        styles={{
                          menuPortal: provided => ({ ...provided, zIndex: 9999 }),
                          menu: provided => ({ ...provided, zIndex: 9999 })
                        }}
                        placeholder="Select the User"
                        onChange={(e) => {
                          console.log(e);
                          formik.setFieldValue("userId", e.value);
                          otpFormik.setFieldValue("userId",e.value);
                          formik.setFieldValue("walletAddress", e.walletAddress);
                        }}
                      />
                      <div className="input-behind"></div>
                    </>
                  )}
                </div>
              </div>
              {/* <div className="col-6">
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
                </div>
              </div> */}
            </div>
          </div>

          <div className="button-holder">
            {!otp?(<Button text={"Request"} 
              onClickFunction={formik.handleSubmit}
              />):(<Button text={"Sell"} 
              onClickFunction={otpFormik.handleSubmit}
              />)}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SellModal;
