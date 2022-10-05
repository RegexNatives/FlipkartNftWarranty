import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../actions/auth.actions"

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sideLink, setsideLink] = React.useState(0);
  const { loggedIn,user } = useSelector(state => state.user);

  useEffect(() => {
    setsideLink(1);
  },[])

  return (
    <>
    {
      window.location.pathname === "/" ? (
        null
      ):(
        <>
        <>
          <div className="admin-sidebar">
            <div className="admin-sidebar-list">
              <ul>
                <li
                  onClick={() => {
                    setsideLink(1);
                    navigate("/assign")
                  }}
                  className={sideLink === 1 ? "active-sidelink" : null}
                >
                  Assign
                </li>
                <li
                  onClick={() => {
                    setsideLink(3);
                    {user?.type == "superAdmin" ? (navigate("/admins")) :(navigate("/vendors")) }
                  }}
                  className={sideLink === 3 ? "active-sidelink" : null}
                >
                  {user?.type == "superAdmin" ? ('Admins') :('Vendors') }
                </li>
                <li
                  onClick={() => {
                    setsideLink(2);
                    dispatch(logout())
                  }}
                  className={sideLink === 2 ? "active-sidelink" : null}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </>
        </>
      )
    }
    </>
   
  );
};

export default Sidebar;
