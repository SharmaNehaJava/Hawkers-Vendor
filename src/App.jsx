import React from "react";
import Nav from './Pages/Nav.jsx';
import Home from "./Pages/Home.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
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

export default App;
