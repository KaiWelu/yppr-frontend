import React from "react";

const AboutGEMNews: React.FC = () => {
  return (
    <div className="bg-white text-black p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Über GEM NEWS</h2>

      <p className="text-sm mb-3">
        Es ist schwierig Inhalte zu finden, die nicht in Mehrheitssprachen wie
        Englisch geschrieben sind.{" "}
        <span className="font-bold">
          Online-Tools sind bei “seltenen” Sprachen nicht zuverlässig.
        </span>{" "}
        Wir wollen diese Sprachbarriere überwinden und bieten ausgewählten und
        unabhängigen Medienmacher*innen ein{" "}
        <span className="font-bold">Übersetzungsbudget</span> an, mit dem sie
        professionell ihre Nachrichten übersetzen lassen können.
      </p>

      <p className="text-sm mb-4">
        Die Nachrichten werden kuratiert von{" "}
        <a
          href="https://www.gem-something.org" // Replace with actual URL
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-purple-700 hover:text-purple-900"
        >
          Gender Equality Media e.V.
        </a>
        , einem gemeinnütziger Verein für intersektional-feministischen,
        digitalen Aktivismus.
      </p>

      <button className="mt-2 bg-purple-400 hover:bg-purple-500 text-white text-sm font-medium py-2 px-4 rounded-full shadow">
        Mehr zu uns
      </button>
    </div>
  );
};

export default AboutGEMNews;
