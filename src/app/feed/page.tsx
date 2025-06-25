"use client";
import React from "react";
import { useProtectedPosts } from "@/hooks/usePosts";
import { Post } from "@/types/Post";
import CreatePostForm from "@/components/ui/CreatePostForm";
import NavBar from "@/components/ui/NavBar";

const Feed = () => {
  const { data, isLoading, isError } = useProtectedPosts();

  if (isLoading) return <div className="p-10">LOADING!</div>;
  if (isError) return <div className="p-10">FAILED TO LOAD!</div>;

  return (
    <div>
      <NavBar />
      <CreatePostForm />
      <div className="mt-10 flex flex-col gap-6 pb-10">
        {data?.map((post: Post) => (
          <div
            key={post.title}
            className="bg-white/90 rounded-md px-4 py-3 mx-2 relative shadow-sm"
          >
            <h2 className="text-2xl font-primary  underline decoration-purple-500 mb-3">
              {post.title}
            </h2>
            <p className="font-comic font-light">{post.content}</p>
            <div className="text-sm my-2 text-black font-semibold underline decoration-purple-500 w-fit px-2 rounded-md absolute top-1 right-2">
              {post.userName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
