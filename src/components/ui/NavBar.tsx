"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/authProvider";
import { useRouter } from "next/navigation";
import CreatePostModal from "./CreatePostModal";
import { motion } from "motion/react";
import { toast } from "react-toastify";
import { SquarePlus } from "lucide-react";

const NavBar = () => {
  const { token, isAuthenticated, username, logout } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleToast = () => {
    toast.error("Toasting works!");
  };

  if (!token && !isAuthenticated) return null;
  return (
    <div className="w-full flex justify-center bg-transparent sticky top-0 z-50 font-primary">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-md w-full h-16 flex items-center justify-between px-4 shadow-md mt-0 md:mt-2"
      >
        <div className="flex flex-row gap-2">
          <p
            onClick={handleToast}
            className="text-3xl font-bold bg-purple-500 text-white px-3 py-1 rounded-md shadow-md"
          >
            YPPR
          </p>
        </div>
        <motion.button
          onClick={() => setIsModalOpen(true)}
          className="flex flex-row justify-center items-center gap-2 p-2"
          animate={{
            rotate: [0, -2, 2, -2, 2, 0], // wiggle keyframes
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 12, // wait 2 seconds between wiggles
            ease: "easeInOut",
          }}
        >
          <p className="text-xl hidden sm:block">New Post</p>
          <motion.div whileHover={{ scale: 1.3 }}>
            <SquarePlus
              size={26}
              strokeWidth={1.7}
              className="text-purple-500 hover:text-purple-600"
            />
          </motion.div>
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
