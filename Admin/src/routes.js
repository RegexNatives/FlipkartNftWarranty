import React,{useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate
  } from "react-router-dom";
  import Home from "./pages/Home";
  import AllOrder from "./pages/Products";
  import Orders from "./pages/Orders"; 
  import AdminPage from "./pages/AdminPage"; 
  import OrderDetails from "./pages/OrderDetails"; 
import AdminOrderDetails from "./pages/AdminOrderDetails";
import Nfts from "./pages/Nfts";
export default function Navigation() { 
 
    return( 

            <Routes> 
                <Route path="/orders" element={<AdminPage />} />
                <Route path="/mynfts" element={<Nfts />} />

                <Route path="/orders/:id" element={<AdminOrderDetails />} /> 
            </Routes>
    )
}