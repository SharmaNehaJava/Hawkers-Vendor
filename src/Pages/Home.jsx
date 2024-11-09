// Home.jsx
import React from 'react';
import Nav from './Nav.jsx';
import { NavLink, Route, Routes } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { FaListAlt } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import Orders from './Orders';
import Overview from './Overview.jsx';
import Products from './Products.jsx';
import Users from './Users.jsx';
import Sales from './Sales.jsx';
import Analytics from './Analytics.jsx';
import Settings from './Settings.jsx';

const Home = () => {
  return (
    <div className="bg-gray-200 h-screen">
      <Nav />
      <div className="flex m-2 bg-white h-5/6 p-2">
        
        {/* Sidebar with NavLinks */}
        <div className="bg-gray-300 shadow-lg w-1/6">
          <NavLink
            to=""
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <IoIosAdd />
            <h3 className="mx-2">Overview</h3>
          </NavLink>

          <NavLink
            to="products"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <FaListAlt />
            <h3 className="mx-2">Products</h3>
          </NavLink>

          <NavLink
            to="users"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <AiOutlineFileDone />
            <h3 className="mx-2">Users</h3>
          </NavLink>

          <NavLink
            to="sales"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <AiOutlineFileDone />
            <h3 className="mx-2">Sales</h3>
          </NavLink>

          <NavLink
            to="orders"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <AiOutlineFileDone />
            <h3 className="mx-2">Orders</h3>
          </NavLink>

          <NavLink
            to="analytics"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <AiOutlineFileDone />
            <h3 className="mx-2">Analytics</h3>
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex justify-evenly items-center m-4 text-center p-2 rounded-md shadow-lg hover:bg-green-100 ${
                isActive ? 'bg-green-200 border-l-4 border-green-500' : 'bg-white'
              }`
            }
          >
            <AiOutlineFileDone />
            <h3 className="mx-2">Settings</h3>
          </NavLink>
        </div>

        
        <div className="mx-4 bg-gray-300 shadow-lg w-full">
          <Routes>
            <Route path="" element={<Overview/>} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="sales" element={<Sales />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Home;
