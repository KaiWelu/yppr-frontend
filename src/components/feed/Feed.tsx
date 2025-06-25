"use client";
import React from "react";
import { useInfinitePaginatedPosts } from "@/hooks/usePosts";
import { useAuth } from "@/context/authProvider";
import CreatePostForm from "@/components/ui/CreatePostForm";
import PostCard from "./PostCard";

const Feed = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfinitePaginatedPosts();
  const { token, isAuthenticated } = useAuth();

  if (isLoading) return <div className="p-10">LOADING!</div>;
  /* if (isError) return <div className="p-10">FAILED TO LOAD!</div>; */

  return (
    <>
      {token && isAuthenticated && (
        <div className="mb-10">
          <div className="mt-10 flex flex-col gap-6 pb-10">
            {data?.pages.flatMap((page) =>
              page.content.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
          <button
            onClick={() => fetchNextPage()}
            className="bg-purple-500 text-white font-semibold p-2 rounded-md shadow-md justify-items-center"
          >
            Load more!
          </button>
        </div>
      )}
    </>
  );
};

export default Feed;
