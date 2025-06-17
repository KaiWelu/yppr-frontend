"use client";

import React from "react";
import { useArticle } from "../hooks/useArticle";
import ArticleTile from "../components/ui/ArticleTile";

const ArticlePage = () => {
  const { data, isLoading, error } = useArticle();

  if (isLoading) return <div>Is loading Articles...</div>;
  if (error) return <div>Error loading Articles</div>;
  console.log(data);
  console.log(Array.isArray(data));

  return (
    <main className="p-5 bg-amber-200 w-full min-h-screen">
      {data?.map((article, index) => (
        <ArticleTile key={index} {...article} />
      ))}
    </main>
  );
};

export default ArticlePage;
