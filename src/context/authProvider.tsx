"use client";

import { getUsernameFromToken } from "@/api/getUsernameFromToken";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);

    setUsername(getUsernameFromToken(jwt));
    localStorage.setItem("username", getUsernameFromToken(jwt) || "");
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
