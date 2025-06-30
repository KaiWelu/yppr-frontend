"use client";
import React from "react";
import { useInfinitePaginatedPosts } from "@/hooks/usePosts";
import { useAuth } from "@/context/authProvider";
import { CircleChevronDown } from "lucide-react";
import { motion } from "motion/react";
import PostCard from "./PostCard";

const Feed = () => {
  const { data, fetchNextPage, hasNextPage } = useInfinitePaginatedPosts();
  const { token, isAuthenticated } = useAuth();

  return (
    <>
      {token && isAuthenticated && (
        <div className="mb-6">
          <div className="mt-6 flex flex-col gap-4 mb-6">
            {data?.pages.flatMap((page) =>
              page.content.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
          <div className="w-full flex justify-center">
            {hasNextPage && (
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={() => fetchNextPage()}
                className=" text-purple-500 hover:text-purple-600 font-semibold rounded-xl justify-items-center"
              >
                <CircleChevronDown
                  size={64}
                  strokeWidth={1.5}
                  className=" drop-shadow-2xl"
                />
              </motion.button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Feed;
