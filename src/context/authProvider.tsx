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
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setUsername(getUsernameFromToken(jwt));
    console.log("Username from token: " + getUsernameFromToken(jwt));
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
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
