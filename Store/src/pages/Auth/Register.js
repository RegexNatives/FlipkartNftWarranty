import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import ErrorImg from "../../img/error.svg";
import LoginTop from "../../img/logintop.svg";
import User from "../../img/admin.svg";
import { BasicContext } from "../../context/BasicContext";
import { registerValidations } from "../../utils/validators";
import { registerUser } from "../../actions/auth.actions";
import Button from "../../component/Button";
import { useNavigate } from "react-router";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const { currentAccount } = useSelector((state) => state.user);

  const { currentAccount,connectWallet } = useContext(BasicContext);


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      name: "",
      phone: "",
      walletAddress: "",
    },
    validationSchema: registerValidations,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(registerUser(values,navigate));
    },
  });


  useEffect(() => {
    if(currentAccount){
      formik.setFieldValue("walletAddress", currentAccount);
    }
  },[currentAccount])

  return (
    <>
      <div className="new-login-page">
        <div className="new-login-container">
          <div className="login-top-image">
            <img src={LoginTop} alt="" />
          </div>
          {formik.errors.email && formik.touched.email ? (
                     <img className="error-img" src={ErrorImg} alt="" /> 
                  ) : null}
         
          <div className="new-login-user-icon">
            <img src={User} alt="" />
          </div>
          <div className="login-header">
             Register 
          </div>
          <div className="new-login-inputs">
          <div className="login-inputs">
              <div className="login-input">
                  <input
                    placeholder="Name"
                    type="name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.name && formik.touched.name ? (
                    <p className="error">{formik.errors.name}</p>
                  ) : null}
                </div>
                <div className="login-input">
                  <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.email && formik.touched.email ? (
                    <p className="error">{formik.errors.email}</p>
                  ) : null}
                </div>
                <div className="login-input">
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.password && formik.touched.password ? (
                    <p className="error">{formik.errors.password}</p>
                  ) : null}
                </div>

                <div className="login-input">
                  <input
                    placeholder="Repeat Password"
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    value={formik.values.rePassword}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <p className="error">{formik.errors.rePassword}</p>
                  ) : null}
                </div>
                <div className="login-input">
                  <input
                    placeholder="Phone"
                    type="text"
                    id="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  <div className="input-behind"></div>
                  {formik.errors.phone && formik.touched.phone ? (
                    <p className="error">{formik.errors.phone}</p>
                  ) : null}
                </div>
                <div className="login-input">
                  <input
                    placeholder="Wallet Address"
                    type="text"
                    id="walletAddress"
                    name="walletAddress"
                    value={formik.values.walletAddress}
                    onChange={formik.handleChange}
                     disabled
                  />
                  <div className="input-behind"></div>
                  {formik.errors.walletAddress && formik.touched.walletAddress ? (
                    <p className="error">{formik.errors.walletAddress}</p>
                  ) : null}
                </div>
              </div>
              <div className="register-btns">
                {!currentAccount && (
                    <Button 
                        text="Connect Wallet"
                        onClickFunction={()=>connectWallet("reset")}
                    />
                )}
              <Button text={"Register"} onClickFunction={formik.handleSubmit} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
