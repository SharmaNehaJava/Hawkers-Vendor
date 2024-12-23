import React from "react"; // Added useEffect import
import Nav from '../Pages/Nav.jsx';
import Home from "../Pages/Home.jsx";
import { Route, Routes } from "react-router-dom";

function DashBoard() {

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Nav />
      <div className="flex-grow overflow-hidden">
        <Routes>
          <Route path="/*" element={<Home />} /> 
        </Routes>
      </div>
      
    </div>
  );
}

export default DashBoard;
