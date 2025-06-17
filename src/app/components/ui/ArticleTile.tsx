import React from "react";
import { ExternalLink } from "lucide-react";
import { Article } from "@/app/hooks/useArticle";

const ArticleTile: React.FC<Article> = ({
  title,
  content,
  language,
  link,
  publishedAt,
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto border-t-4 border-purple-500">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="relative block border border-gray-300 shadow-sm p-4 bg-white hover:shadow-md transition rounded-sm"
      >
        <div className="absolute top-2 right-2 text-gray-500">
          <ExternalLink size={16} />
        </div>

        <p className="text-sm text-gray-500 italic">taz.de – 24.08.2024</p>

        <h2 className="text-lg font-semibold mt-1 mb-2">{title}</h2>

        <p className="text-sm text-gray-800 mb-3">
          Nach der Tat von Solingen fordert die Opposition ein schärferes
          Asylrecht. Laut Regierungssprecher stehe das Grundrecht auf Asyl nicht
          zur Debatte.
        </p>

        <p className="text-xs italic text-gray-600">
          Originalsprache: Griechisch
        </p>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-purple-700" />
      </a>
    </div>
  );
};

export default ArticleTile;
