import React from "react";
import { useNavigate } from "react-router-dom";
import AssignSellerModal from "./Modals/Assign";

const Sidebar = () => {
  const navigate = useNavigate();
  const [sideLink, setsideLink] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className="admin-sidebar">
        <div className="admin-sidebar-list">
          <ul>
            <li
              onClick={() => {
                setsideLink(1);
              }}
              className={sideLink === 1 ? "active-sidelink" : null}
            >
              Dashboard
            </li>
            <li
              onClick={() => {
                setsideLink(2);
              }}
              className={sideLink === 2 ? "active-sidelink" : null}
            >
              All-products
            </li>
            <li
              onClick={() => {
                setsideLink(3);
              }}
              className={sideLink === 3 ? "active-sidelink" : null}
            >
              Orders
            </li>
            <li
              onClick={() => {
                setsideLink(4);
              }}
              className={sideLink === 4 ? "active-sidelink" : null}
            >
              NFTs
            </li>
            <li
              onClick={() => {
                setOpen(true);
              }}
              className={sideLink === 5 ? "active-sidelink" : null}
            >
              Assign Seller
            </li>
          </ul>
        </div>
      </div>
      <AssignSellerModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
