import { PostResponse } from "@/types/PostResponse";
import React from "react";
import { useAuth } from "@/context/authProvider";
import { getFormattedDate } from "@/util/getFormattedDate";

const PostCard = ({ post }: { post: PostResponse }) => {
  const { username } = useAuth();

  return (
    <div className="bg-white/90 rounded-md py-3 px-4 mx-2 shadow-sm">
      <h2 className="text-3xl font-primary  underline decoration-purple-500 mb-1">
        {post.title}
      </h2>
      <p className="font-comic font-light text-lg">{post.content}</p>
      <div className="h-8 rounded-md flex flex-row justify-between mt-4 gap-2">
        <div className="text-sm text-black font-light w-fit flex items-baseline justify-baseline">
          {post.userName} - <span>{getFormattedDate(post.createdAt)}</span>
        </div>
        {username === post.userName && (
          <div className="text-sm text-purple-500 font-semibold underline decoration-purple-500 w-fit flex items-center justify-center">
            {post.userName}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
