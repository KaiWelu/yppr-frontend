import React from "react";

const YpprBanner = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center w-full my-12 text-white gap-2 font-primary">
      <h1 className="text-9xl font-bold drop-shadow-xl border-b-6 border-fuchsia-400 mb-2">
        YPPR
      </h1>
      <p className="text-3xl font-light drop-shadow-xl ">
        Let your thoughts run <span className="bold">free!</span>
      </p>
      <p className="text-3xl font-light drop-shadow-xl ">Every yap matters!</p>
    </section>
  );
};

export default YpprBanner;
