import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in (fetching from local storage or API)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // If not logged in, set user to null
      setUser(null);
    }
  }, []);

  const logout = () => {
    // Clear user data and log out
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, logout };
};
