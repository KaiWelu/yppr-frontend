import React from "react";

const InfoBanner = () => {
  return (
    <div className="bg-black text-white p-6 sm:p-10 max-w-xl mx-auto border-t-4 border-purple-500 ">
      <h1 className="text-2xl sm:text-3xl font-semibold leading-snug">
        Finde intersektional-feministische Artikel{" "}
        <span className="text-purple-400 block">
          aus allen Sprachen, <br /> aus erster Hand.
        </span>
      </h1>

      <p className="mt-6 text-sm sm:text-base">
        Wir sammeln{" "}
        <span className="font-semibold">professionell übersetzte Artikel</span>{" "}
        von unabhängigen Medienmacher*innen und aktivistischen Gruppen.
      </p>

      <p className="mt-4 text-sm sm:text-base">
        <span className="font-semibold">
          Sprache sollte keine Barriere sein
        </span>
        , um sich international zu vernetzen. Lies Nachrichten, die du sonst
        nicht verstehen würdest.
      </p>
    </div>
  );
};

export default InfoBanner;
