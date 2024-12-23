import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the vendor is already logged in
    const vendorInfo = JSON.parse(localStorage.getItem('vendorInfo'));
    // If vendorInfo exists, redirect to the dashboard
    if (vendorInfo && vendorInfo.token) {
      navigate('/vendor-dashboard');
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Routes>
        <Route path="/vendor-signin" element={<SignIn />} />
        <Route path="/vendor-signup" element={<SignUp />} />
        <Route path="/*" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;