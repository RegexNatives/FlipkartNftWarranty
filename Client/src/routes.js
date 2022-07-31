import React from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllOrder from "./pages/Products";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/Orders/OrderDetails";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllOrder />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order/:id" element={<OrderDetails />} />
    </Routes>
  );
}
