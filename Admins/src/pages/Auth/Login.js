import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import User from "../../img/admin.svg";
import { loginValidations } from "../../utils/validators";
import { loginUser } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidations,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log(values);
      dispatch(loginUser(values, navigate));
    },
  });
  return (
    <>
      <div className="login-page">
        <div className="admin-cont-wrap">
          <div className="admin-product-wrap | login-cont-wrap">
            <div className="admin-product-inner">
              <h1>
                {" "}
                <img src={User} alt="" /> Login
              </h1>
              <div className="login-inputs">
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
              </div>
              <Button text={"Login"} onClickFunction={formik.handleSubmit} />
            </div>
          </div>
          <div className="admin-cont-behind | login-behind"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
