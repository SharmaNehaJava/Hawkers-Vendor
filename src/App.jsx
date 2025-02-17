import React, { useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Home from "./Pages/Home.jsx";
import Overview from "./Pages/Overview.jsx";
import Products from "./Pages/Products.jsx";
import Users from "./Pages/Users.jsx";
import Sales from "./Pages/Sales.jsx";
import Orders from "./Pages/Orders.jsx";
import Analytics from "./Pages/Analytics.jsx";
import Settings from "./Pages/Settings.jsx";
import Nav from "./Pages/Nav.jsx";

function App() {
  return (
    <div className="h-screen w-full  overflow-hidden">
      <Nav />
      <div className="flex flex-1 h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />}>
            <Route path="overview" element={<Overview />} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="sales" element={<Sales />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>

      </div>
    </div>
  );
}

export default App;
