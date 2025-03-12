import React, { useEffect, useContext, useState } from 'react';
import { useSocket } from '../Context/SocketContext';
import { AuthContext } from '../Context/AuthContext';
import { NavLink, Outlet } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
import { FaListAlt } from 'react-icons/fa';
import { AiOutlineFileDone, AiOutlineMenu } from 'react-icons/ai';

const Home = () => {
  const socket = useSocket();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const { isLoggedIn, vendorInfo } = useContext(AuthContext);

  useEffect(() => {
    if (socket && isLoggedIn) {
      socket.emit('vendorOnline', {
        vendorId: vendorInfo._id,
      });
    }
  }, [socket, vendorInfo]);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    if (socket && isLoggedIn) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('updateVendorLocation', {
            vendorId: vendorInfo._id,
            coordinates: [longitude, latitude],
            token: vendorInfo.token,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              console.error('An unknown error occurred.');
              break;
            default:
              console.error('Error getting location:', error);
          }
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [socket, vendorInfo]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-full lg:h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-green-800 bg-gradient-to-b from-green-200 to-green-500 ${isCollapsed ? 'w-16' : 'w-64'} h-full transition-all duration-300`}> 
        {/* Toggle Button */}
        <button
          className="flex items-center justify-center mb-4 p-2 w-full h-12 text-white transition-all duration-300 hover:bg-green-600 hover:scale-105"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <AiOutlineMenu size={24} />
        </button>

        {/* NavLinks */}
        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} m-4 p-2 rounded-md transition-all duration-300 ${isActive ? 'bg-white text-green-500' : 'bg-green-500 text-white'} hover:bg-white hover:text-green-500`
          }
        >
          <FaListAlt />
          {!isCollapsed && <h3 className="mx-2">Products</h3>}
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} m-4 p-2 rounded-md transition-all duration-300 ${isActive ? 'bg-white text-green-500' : 'bg-green-500 text-white'} hover:bg-white hover:text-green-500`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Orders</h3>}
        </NavLink>

        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} m-4 p-2 rounded-md transition-all duration-300 ${isActive ? 'bg-white text-green-500' : 'bg-green-500 text-white'} hover:bg-white hover:text-green-500`
          }
        >
          <AiOutlineFileDone />
          {!isCollapsed && <h3 className="mx-2">Settings</h3>}
        </NavLink>
      </div>

      {/* Main Content */}
      <div className={`flex-grow w-screen overflow-hidden overflow-y-auto transition-all duration-300 `}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;