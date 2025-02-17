import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [vendorInfo, setVendorInfo] = useState(null);

  useEffect(() => {
    const parsedVendorInfo = JSON.parse(localStorage.getItem('vendorInfo'));
    
    if (parsedVendorInfo && parsedVendorInfo.token) {
      try { 
        // console.log("AuthContext vendorInfo:", parsedVendorInfo);
          setIsLoggedIn(true);
          setVendorInfo(parsedVendorInfo);
      } catch (error) {
        console.error("Error parsing vendorInfo from localStorage:", error);
        // localStorage.removeItem('vendorInfo'); 
      }
    }
  }, []);

  const login = () => {
      setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('vendorInfo');
    setIsLoggedIn(false);
    setVendorInfo(null);
    // console.log("AuthContext logout called, isLoggedIn set to false");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, vendorInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};