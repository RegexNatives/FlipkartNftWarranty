import React, { useEffect } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders/Order";
import Login from "./pages/Auth/Login";
import Warranties from "./pages/Requests/Warranties";
import WarrantyRequest from "./pages/Requests/Warranty";
import BlockChainNFTs from "./pages/Warranty/Warranties"
import SingleNFT from "./pages/Warranty/NFT";
import Avails from "./pages/Warranty/Avails";

const routes = [
  {
    path: "/",
    exact: true,
    element : <Login />,
    private : false,
  },
  // {
  //   path: "/products",
  //   exact: true,
  //   element : <Products />,
  //   private : false,
  // },
  // {
  //   path : "/products/:id",
  //   exact : true,
  //   element : <Product />,
  //   private : false,
  // },
  {
    path: "/orders",
    exact: true,
    element : <Orders />,
    private : true,
  },
  {
    path: "/order/:id",
    exact: true,
    element : <OrderDetails />,
    private : true,
  },
  {
    path: "/warranty-requests",
    exact: true,
    element : <Warranties />,
    private : true,
  },
  {
    path: "/warranty-requests/:id",
    exact: true,
    element : <WarrantyRequest />,
    private : true,
  },
  {
    path: "/warranties",
    exact: true,
    element : <BlockChainNFTs />,
    private : true,
  },
  {
    path: "/warranties/:id",
    exact: true,
    element : <SingleNFT />,
    private : true,
  },
  {
    path: "/claim-requests",
    exact: true,
    element : <Avails />,
    private : true,
  }
]



export default function Navigation() {

  const {loggedIn} = useSelector(state => state.user);

  useEffect(() => {
    if(loggedIn && window.location.pathname === "/"){
      window.location.href = "/orders";
    }

    if (window.location.pathname === "/orders") {
      document.body.style.backgroundColor = "#F9F8FF";
    }
      
  },[loggedIn,window.location.pathname])



  return (
    <Routes>
      {routes.map((route, index) => (
        <Route 
          key={index} 
          path={route.path} 
          element={
            route.private ? (
              loggedIn ? route.element : (
                window.location.pathname !== "/" && (
                  <Navigate to="/" />
                )
              )
            ) : (route.element)
          } />
      ))}
      {/* <Route path="/" element={<AdminPage />} />
      <Route path="/orders/:id" element={<AdminOrderDetails />} /> */}
    </Routes>
  );
}
