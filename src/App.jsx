import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Pages/Nav.jsx";

const SignIn = lazy(() => import("./Pages/SignIn.jsx"));
const SignUp = lazy(() => import("./Pages/SignUp.jsx"));
const Home = lazy(() => import("./Pages/Home.jsx"));
const Welcome = lazy(() => import("./Pages/Welcome.jsx"));
const Overview = lazy(() => import("./Pages/Overview.jsx"));
const Products = lazy(() => import("./Pages/Products.jsx"));
const Users = lazy(() => import("./Pages/Users.jsx"));
const Sales = lazy(() => import("./Pages/Sales.jsx"));
const Orders = lazy(() => import("./Pages/Orders.jsx"));
const Analytics = lazy(() => import("./Pages/Analytics.jsx"));
const Settings = lazy(() => import("./Pages/Settings.jsx"));

function App() {
  return (
    <Router>
      <div className="h-screen w-full  overflow-hidden">
        <Nav />
        <div className="flex flex-1 h-screen w-screen overflow-hidden">
        <Suspense
          fallback={
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center bg-green-500 text-white">
              <div className="loader mt-4">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              <style jsx="true">{`
                .loader {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .dot {
                  width: 12px;
                  height: 12px;
                  margin: 0 6px;
                  background-color: white;
                  border-radius: 50%;
                  animation: bounce 1.2s infinite ease-in-out;
                }
                @keyframes bounce {
                  0%, 20%, 50%, 80%, 100% {
                    transform: translateY(0);
                  }
                  40% {
                    transform: translateY(-20px);
                  }
                  60% {
                    transform: translateY(-10px);
                  }
                }
              `}</style>
            </div>
          }>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />}>
              <Route path='' element={<Welcome />} />
              <Route path="overview" element={<Overview />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="sales" element={<Sales />} />
              <Route path="orders" element={<Orders />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
