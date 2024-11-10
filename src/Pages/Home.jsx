import React, { useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { FaListAlt } from 'react-icons/fa';
import { AiOutlineFileDone, AiOutlineMenu } from 'react-icons/ai';
import Orders from './Orders';
import Overview from './Overview';
import Products from './Products';
import Users from './Users';
import Sales from './Sales';
import Analytics from './Analytics';
import Settings from './Settings';

const Home = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-full lg:h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-gray-950 bg-opacity-95 shadow-lg ${isCollapsed ? 'w-16' : 'w-full lg:w-1/6'} h-auto lg:h-full lg:overflow-y-auto transition-all duration-300`}>
        {/* Toggle Button */}
        <button
          className="flex items-center justify-center mb-4 p-2 w-full h-12 text-white transition-all duration-300 hover:bg-green-600 hover:scale-105"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <AiOutlineMenu size={24} />
        </button>

        {/* NavLinks */}
        <NavLink
          to=""
          className={({ isActive }) =>
           `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <IoIosAdd />
          {!isCollapsed && <h3 className="mx-2">Overview</h3>}
        </NavLink>

        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <FaListAlt />
          {!isCollapsed && <h3 className="mx-2">Products</h3>}
        </NavLink>

        <NavLink
          to="users"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Users</h3>}
        </NavLink>

        {/* Additional NavLinks */}
        <NavLink
          to="sales"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Sales</h3>}
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Orders</h3>}
        </NavLink>

        <NavLink
          to="analytics"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Analytics</h3>}
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex items-center ${
              isCollapsed ? 'justify-center' : 'justify-evenly'
            } m-4 p-2 rounded-md bg-gradient-to-r from-green-500 to-green-100  hover:bg-green-600 hover:scale-110 ${
              isActive ? 'scale-110 ' : 'bg-white'
            }`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Settings</h3>}
        </NavLink>
      </div>

      {/* Main Content */}
      <div className={`flex-grow w-full lg:w-5/6 overflow-y-auto transition-all duration-300 ${isCollapsed ? 'lg:w-full' : 'lg:w-5/6'}`}>
        <Routes>
          <Route path="" element={<Overview />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="sales" element={<Sales />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
