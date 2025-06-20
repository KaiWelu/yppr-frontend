"use client";
import React from "react";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const { token, isAuthenticated, username, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!token && !isAuthenticated) return null;
  return (
    <div className="w-full flex justify-center bg-transparent top z-50 sticky font-primary">
      <nav className="bg-white/70 w-full h-16 flex items-center justify-between px-4 shadow-md mt-0 md:mt-2">
        <p className="text-3xl font-bold bg-fuchsia-400 text-white px-3 py-1 rounded-md shadow-md">
          YPPR
        </p>
        <div className="flex flex-row gap-3 justify-center items-center">
          <p className="">{username}</p>
          <button
            className="bg-red-300 p-1 rounded-md shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
