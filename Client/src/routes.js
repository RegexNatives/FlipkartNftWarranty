import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllOrder from "./pages/Products";
import Orders from "./pages/Orders";
import AdminPage from "./pages/AdminPage";
import OrderDetails from "./pages/OrderDetails";
import NFTs from "./pages/NFTs";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllOrder />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/mynfts" element={<NFTs />} />
      <Route path="/order/:id" element={<OrderDetails />} />
      {/* <Route path="/app" element={<WebBuilder />} />
                <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}
