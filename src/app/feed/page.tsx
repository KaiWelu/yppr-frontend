"use client";
import React from "react";
import { useProtectedPosts } from "@/hooks/useProtectedPosts";
import { Post } from "@/types/Post";

const Feed = () => {
  const { data, isLoading, isError } = useProtectedPosts();

  if (isLoading) return <div className="p-10">LOADING!</div>;
  if (isError) return <div className="p-10">FAILED TO LOAD!</div>;

  return (
    <div>
      {data?.map((post: Post) => (
        <div key={post.title} className="p-10">
          <h2 className="text-2xl">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
