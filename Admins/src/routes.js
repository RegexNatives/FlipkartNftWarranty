import React, { useEffect } from "react";
import { Routes, Route,Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Auth/Login";
import AssignUser from "./pages/Assign";
import Users from "./pages/Users";

const routes = [
  {
    path: "/",
    exact: true,
    element : <Login />,
    private : false,
  },
  {
    path: "/assign",
    exact: true,
    element : <AssignUser />,
  },
  {
    path : "/vendors",
    exact : true,
    element : <Users />,
  },
  {
    path : "/admins",
    exact : true,
    element : <Users />,
  }

]



export default function Navigation() {

  const navigate = useNavigate();
  const {loggedIn} = useSelector(state => state.user);

  useEffect(() => {
    if(loggedIn && window.location.pathname === "/"){
      navigate("/assign")
    }
    if(!loggedIn){
      navigate("/")
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
