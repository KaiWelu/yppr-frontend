import React from "react";

const SupportProject: React.FC = () => {
  return (
    <div className="bg-black text-white p-6 sm:p-8 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Unterstütze dieses Projekt!</h2>

      <p className="text-sm mb-3">
        Wir finanzieren uns ausschließlich durch Spenden. Wenn du dieses Projekt
        unterstützen möchtest, freuen wir uns über jede Spende!
      </p>

      <p className="text-sm mb-6">
        Hilf’ uns, die internationale Vernetzung zu fördern und Kämpfe zu
        verbinden.
      </p>

      <button className="bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow">
        Zur Spende
      </button>
    </div>
  );
};

export default SupportProject;
