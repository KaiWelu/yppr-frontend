import React from "react";
import { useAuth } from "@/context/authProvider";

const YpprBanner = () => {
  const { isAuthenticated, token } = useAuth();
  return (
    <div>
      {!isAuthenticated && !token && (
        <section className="flex flex-col items-center justify-center text-center w-full my-12 text-white gap-2 font-primary">
          <h1 className="text-9xl font-bold drop-shadow-xl border-b-6 border-purple-500 mb-2">
            YPPR
          </h1>
          <p className="text-3xl font-light drop-shadow-xl ">
            Let your thoughts run <span className="bold">free!</span>
          </p>
          <p className="text-3xl font-light drop-shadow-xl ">
            Every yap matters!
          </p>
        </section>
      )}
    </div>
  );
};

export default YpprBanner;
