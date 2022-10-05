import React, { useEffect } from "react";
import {  Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Products from "./pages/Products";
import Product from "./pages/Products/Product";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/Orders/Order";
import Warranties from "./pages/Warranties/index";
import Warranty from "./pages/Warranties/Warranty";

const routes = [
  {
    path: "/",
    exact: true,
    element : <Home />,
    private : false,
  },
  {
    path: "/login",
    exact: true,
    element : <Login />,
    private : false,
  },
  {
    path: "/register",
    exact: true,
    element : <Register />,
    private : false,
  },
  {
    path: "/products",
    exact: true,
    element : <Products />,
    private : false,
  },
  {
    path : "/products/:id",
    exact : true,
    element : <Product />,
    private : false,
  },
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
    path : "/warranties",
    exact : true,
    element : <Warranties/>,
    private : true
  },
  {
    path : "/warranty/:id",
    exact : true,
    element : <Warranty/>,
    private : true
  }
]

export default function Navigation() {

  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);
  // console.log(loggedIn);


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
                window.location.pathname !== "/login" && (
                  <Navigate to="/login" />
                )
              )
            ) : (route.element)
          } />
      ))}
      {/* <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order/:id" element={<OrderDetails />} /> */}
    </Routes>
  );
}
