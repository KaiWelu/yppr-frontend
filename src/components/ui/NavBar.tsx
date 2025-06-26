"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";
import { motion } from "motion/react";

const NavBar = () => {
  const { token, isAuthenticated, username, logout } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!token && !isAuthenticated) return null;
  return (
    <div className="w-full flex justify-center bg-transparent sticky top-0 z-50 font-primary">
      <motion.nav
        /* initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.3,
          scale: { type: "tween", visualDuration: 0.3, bounce: 0.5 },
        }} */
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md w-full h-16 flex items-center justify-between px-4 shadow-md mt-0 md:mt-2"
      >
        <p className="text-3xl font-bold bg-purple-500 text-white px-3 py-1 rounded-md shadow-md">
          YPPR
        </p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 p-2 text-white font-semibold rounded-md shadow-md"
        >
          New Yap!
        </motion.button>
        <div className="flex flex-row gap-3 justify-center items-center">
          <p className="">{username}</p>
          <button
            className="bg-purple-500 text-white font-semibold p-1 text-md rounded-md shadow-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </motion.nav>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></CreatePostModal>
    </div>
  );
};

export default NavBar;
