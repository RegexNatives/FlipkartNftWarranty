import AdminIcon from "../img/admin.svg";
import React, { useEffect, useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth.actions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.user);



  return (
    <>
      <ToastContainer
        position="bottom-right"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {window.location.pathname === "/" ? (
        <></>
      ) : (
        <div className="navbar">
          <div className="nav-logo" onClick={()=>navigate('/')}>
            <svg
              width="71"
              height="32"
              viewBox="0 0 71 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H13.248C16.896 0 19.776 0.288 21.888 0.864C24 1.408 25.552 2.368 26.544 3.744C27.536 5.12 28.032 7.024 28.032 9.456V22.128C28.032 24.496 27.568 26.336 26.64 27.648C25.712 28.928 24.192 29.84 22.08 30.384C19.968 30.896 17.04 31.152 13.296 31.152H0V0ZM12.96 25.824C15.008 25.824 16.544 25.744 17.568 25.584C18.624 25.392 19.376 25.04 19.824 24.528C20.304 24.016 20.544 23.216 20.544 22.128V9.312C20.544 7.84 19.952 6.816 18.768 6.24C17.616 5.632 15.76 5.328 13.2 5.328H7.488V25.824H12.96Z"
                fill="black"
              />
              <path
                d="M34.0781 0H44.7341L52.4141 22.272L59.9981 0H70.0301V31.152H63.2621V8.112H63.1181L55.2461 31.152H49.2461L41.1341 8.112H40.9421V31.152H34.0781V0Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="nav-links">
            <ul>
              {!loggedIn && <li
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </li>}
              <li
                onClick={() => {
                  navigate("/products");
                }}
              >
                Products
              </li>
              {loggedIn ? (
                <>
                  <li  onClick={() => {
                      navigate("/orders");
                    }}
                  >
                    Orders
                  </li>
                  <li  onClick={() => {
                      navigate("/warranties");
                    }}
                  >
                    Warranties
                  </li>
                  <li
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </li>
                </>
              ):(
                <>
                  <li  onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </li>
                  <li
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </li>
                </>
              )}
              {/* <li
                onClick={() => {
                  fetchNft();
                }}
              >
                My NFT's
              </li> */}
            </ul>
          </div>
         
        </div>
      )}
    </>
  );
};

export default Navbar;
