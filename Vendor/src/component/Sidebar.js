import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth.actions";
import Logo from "../img/logo.svg";
import HomeIcon from "../img/homeicon.svg";
import OrderIcon from "../img/ordericon.svg";
import SidebarIcon from "../img/sidebar-user.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {user} = useSelector((state) => state.user);

  const [sideLink, setsideLink] = React.useState(0);
  return (
    // <>
    //  {
    //   window.location.pathname === "/" ? (
    //     null
    //   ):(
    //   <div className="admin-sidebar">
    //     <div className="admin-sidebar-list">
    //       <ul>
    //         <li
    //           onClick={() => {
    //             setsideLink(1);
    //           }}
    //           className={sideLink === 1 ? "active-sidelink" : null}
    //         >
    //           Dashboard
    //         </li>
    //         <li
    //           onClick={() => {
    //             setsideLink(2);
    //             navigate("/orders");
    //           }}
    //           className={sideLink === 2 ? "active-sidelink" : null}
    //         >
    //           Orders
    //         </li>
    //         <li
    //           onClick={() => {
    //             setsideLink(3);
    //             navigate("/warranty-requests");
    //           }}
    //           className={sideLink === 3 ? "active-sidelink" : null}
    //         >
    //           Requests
    //         </li>
    //         <li
    //           onClick={() => {
    //             setsideLink(4);
    //             navigate("/warranties");
    //           }}
    //           className={sideLink === 4 ? "active-sidelink" : null}
    //         >
    //           Warranties
    //         </li>
    //         <li
    //           onClick={() => {
    //             setsideLink(6);
    //             navigate("/avail-requests");
    //           }}
    //           className={sideLink === 6 ? "active-sidelink" : null}
    //         >
    //           Avails
    //         </li>
    //         <li
    //           onClick={() => {
    //             dispatch(logout());
    //           }}
    //           className={sideLink === 5 ? "active-sidelink" : null}
    //         >
    //           Logout
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    //   )
    //         }
    // </>
    <>
      {window.location.pathname === "/" ? null : (
        <div className="">
          <div className="admin-new-sidebar">
            <div className="new-sidebar-list">
              <div className="new-sidebar-item">
                <div className="new-sidebar-icon new-sidebar-logo">
                  <img src={Logo} alt="" />
                </div>
                <div className="new-sidebar-icon-text new-sidebar-logoname">
                  Regex Natives
                </div>
              </div>
              <div onClick={() => {setsideLink(1);}}  className={ sideLink === 1 ? "new-sidebar-item new-sidebar-item-link active-new-sidear-link": "new-sidebar-item new-sidebar-item-link" }
              >
                <div className="new-sidebar-icon">
                  <img src={HomeIcon} alt="" />
                </div>
                <div className="new-sidebar-icon-text">Dashboard</div>
              </div>
              <div onClick={() => {setsideLink(2);navigate("/orders")}}  className={ sideLink === 2 ? "new-sidebar-item new-sidebar-item-link active-new-sidear-link": "new-sidebar-item new-sidebar-item-link" }>
                <div className="new-sidebar-icon">
                  <img src={OrderIcon} alt="" />
                </div>
                <div className="new-sidebar-icon-text">Orders</div>
              </div>
              <div onClick={() => {setsideLink(3); navigate("/warranty-requests");}}  className={ sideLink === 3 ? "new-sidebar-item new-sidebar-item-link active-new-sidear-link": "new-sidebar-item new-sidebar-item-link" }>
                <div className="new-sidebar-icon">
                  <img src={OrderIcon} alt="" />
                </div>
                <div className="new-sidebar-icon-text">Requests</div>
              </div>
              <div onClick={() => {setsideLink(4); navigate("/warranties");}}  className={ sideLink === 4 ? "new-sidebar-item new-sidebar-item-link active-new-sidear-link": "new-sidebar-item new-sidebar-item-link" }>
                <div className="new-sidebar-icon">
                  <img src={OrderIcon} alt="" />
                </div>
                <div className="new-sidebar-icon-text">Warranties</div>
              </div>
              <div onClick={() => {setsideLink(5);navigate("/claim-requests")}}  className={ sideLink === 5 ? "new-sidebar-item new-sidebar-item-link active-new-sidear-link": "new-sidebar-item new-sidebar-item-link" }>
                <div className="new-sidebar-icon">
                  <img src={OrderIcon} alt="" />
                </div>
                <div className="new-sidebar-icon-text">Claims</div>
              </div>
            </div>
            <div className="admin-sidebar-user">
              <div className="admin-user-img">
                <img src={SidebarIcon} alt="" />
              </div>
              <div className="admin-user-details">
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
                <div className="logout-btn" onClick={()=>dispatch(logout())}>
                  <span>Logout</span>
                  <svg
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8628 0.875977C11.5616 0.875977 12.1281 1.44248 12.1281 2.14129C12.1281 2.79019 11.6397 3.32501 11.0103 3.3981L10.8628 3.40661H4.53619C3.88729 3.40661 3.35248 3.89508 3.27938 4.52437L3.27087 4.67193V19.8558C3.27087 20.5047 3.75934 21.0395 4.38863 21.1126L4.53619 21.1211H10.2301C10.929 21.1211 11.4954 21.6876 11.4954 22.3864C11.4954 23.0353 11.007 23.5701 10.3777 23.6432L10.2301 23.6517H4.53619C2.51462 23.6517 0.862134 22.0715 0.746678 20.0788L0.740234 19.8558V4.67193C0.740234 2.65036 2.32052 0.997876 4.31315 0.88242L4.53619 0.875977H10.8628ZM18.084 7.79027L21.6629 11.3691C22.157 11.8632 22.157 12.6644 21.6629 13.1585L18.084 16.7374C17.5898 17.2316 16.7888 17.2316 16.2945 16.7374C15.8004 16.2433 15.8004 15.4421 16.2945 14.948L17.7135 13.5292H10.8628C10.1639 13.5292 9.59746 12.9627 9.59746 12.2638C9.59746 11.565 10.1639 10.9985 10.8628 10.9985H17.7135L16.2945 9.5797C15.8004 9.08556 15.8004 8.2844 16.2945 7.79027C16.7888 7.29613 17.5898 7.29613 18.084 7.79027Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
