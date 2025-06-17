"use client";
import { useQuery } from "@tanstack/react-query";

export type Article = {
  title: string;
  content: string;
  language: string;
  link: string;
  publishedAt: string;
};

export type ArticleResponse = Article[];

const fetchArticle = async (): Promise<ArticleResponse> => {
  const response = await fetch(
    "http://localhost:8080/api/v1/articles?pageNo=0&pageSize=10&language=de"
  );
  const data = await response.json();
  return data;
};

const useArticle = () => {
  return useQuery({
    queryKey: ["Article"],
    queryFn: () => fetchArticle(),
  });
};

export { useArticle, fetchArticle };
