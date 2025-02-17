import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Nav = () => {
  const { isLoggedIn, login,vendorInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("@username");
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const parsedUser = JSON.parse(JSON.stringify(vendorInfo));
      login();
      setUsername(parsedUser.vendor.name || "@username");
      setProfileImage( '');
    }
  }, [isLoggedIn, login]);

  return (
    <div className="h-12 flex items-center justify-between bg-white px-4 z-10 shadow-md">
      <div className="flex items-center">
        <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
        <img className="h-8" src="./logo.png" alt="Logo" />
      </div>
      <div className="flex justify-center items-center mx-4 text-black">
        {isLoggedIn ? (
          <>
            <div className="h-10 w-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center mx-2">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="text-black">{username}</div>
          </>
        ) : (
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-400"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;