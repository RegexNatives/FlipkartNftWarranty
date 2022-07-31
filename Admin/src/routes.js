import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/Orders/Orders";
import AdminOrderDetails from "./pages/Orders/OrderDetails";
export default function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<AdminPage />} />
      <Route path="/orders/:id" element={<AdminOrderDetails />} />
    </Routes>
  );
}
