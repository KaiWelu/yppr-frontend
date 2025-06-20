"use client";
import React from "react";
import { useAuth } from "@/context/authProvider";

const NavBar = () => {
  const { token, isAuthenticated } = useAuth();

  /*  return  (isAuthenticated <nav className="flex flex-row justify-between bg-white">
      <p className="text-2xl font-bold">YPPR</p>
    </nav> ) */
  if (!token && !isAuthenticated) return null;
  return (
    <div className="w-full flex justify-center bg-transparent top z-50 sticky font-primary">
      <nav className="bg-white/60 w-full md:w-2/3 h-12 flex items-center justify-between px-4 shadow-md mt-0 md:mt-2">
        <p className="text-2xl font-bold text-fuchsia-400">YPPR</p>
      </nav>
    </div>
  );
};

export default NavBar;
