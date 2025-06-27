"use client";

import { ToastContainer, TypeOptions } from "react-toastify";

export const Toaster = () => {
  return (
    <ToastContainer
      position="top-left"
      autoClose={3000}
      toastClassName="rounded-lg p-4 text-sm shadow-md text-purple-500"
      bodyClassName="font-primary"
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
    />
  );
};

export default ToastContainer;
