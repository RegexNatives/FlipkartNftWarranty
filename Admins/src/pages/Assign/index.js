import React, { useContext, useEffect, useState } from "react";
import Hi from "../../img/hi.svg";
import { BasicContext } from "../../context/BasicContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  assignAdminAction,
  assignVendorAction,
} from "../../actions/nft.actions";
import { assignAdminValidations } from "../../utils/validators";
import Loader from "../../component/Loader";

const AssignUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {state} = useLocation();
  const { user } = useSelector((state) => state.user);

  const { currentAccount, connectWallet,resetWallet } = useContext(BasicContext);

  const [loader, setLoader] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: state?.name,
      walletAddress: state?.walletAddress,
    },
    enableReinitialize: true,
    validationSchema: assignAdminValidations,
    onSubmit: async (values) => {
      // console.log(values);
      await resetWallet();
      if (!currentAccount) {
        await connectWallet();
      }
      if(currentAccount){
        setLoader(true);
        if (user?.type == "superAdmin") {
          dispatch(assignAdminAction(values.walletAddress, setLoader));
        } else {
          dispatch(assignVendorAction(values.walletAddress, setLoader));
        }
      }
      else{
        setLoader(false);
      }
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <h1>
            Welcome {user?.name} <img src={Hi} alt="" />{" "}
          </h1>
          <div className="admin-all-products-wrap">
            <h1>Assign {user?.type == "superAdmin"?"Admin":"Vendor"} :</h1>
            {loader ? (
                <Loader />
            ):(

            <div className="admin-all-products-list">
            <div className="login-inputs">
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
                {formik.errors.name && formik.touched.name ? (
                  <p className="error">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="login-input">
                <input
                  type="text"
                  placeholder="Wallet Address"
                  id="walletAddress"
                  name="walletAddress"
                  value={formik.values.walletAddress}
                  onChange={formik.handleChange}
                />
                <div className="input-behind"></div>
                {formik.errors.walletAddress &&
                formik.touched.walletAddress ? (
                  <p className="error">{formik.errors.walletAddress}</p>
                ) : null}
              </div>
            </div>
            <div className="button-holder">
              <Button text={"Assign"} onClickFunction={formik.handleSubmit} />
            </div>
          </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignUser;
