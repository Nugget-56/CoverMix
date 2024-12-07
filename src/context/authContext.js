"use client";

import { useState, useEffect, createContext } from 'react';
import { getAccessTokenFromStorage } from '@/utils/spotify/spotifyAuth';

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => {}
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getAccessTokenFromStorage();
    setIsLoggedIn(!!accessToken);
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
