import { PostResponse } from "@/types/PostResponse";
import React from "react";
import { useAuth } from "@/context/authProvider";
import { getFormattedDate } from "@/util/getFormattedDate";
import { useState } from "react";
import EditPostModal from "../ui/EditPostModal";

const PostCard = ({ post }: { post: PostResponse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useAuth();

  return (
    <div className="bg-white/90 rounded-md py-3 px-4 mx-2 shadow-sm">
      <h2 className="text-3xl font-primary  underline decoration-purple-500 mb-1">
        {post.title}
      </h2>
      <p className="font-comic font-light text-lg">{post.content}</p>
      <p className="font-primary text-sm font-light mt-2">
        Posted at:{" " + getFormattedDate(post.createdAt)}
      </p>
      <div className="h-8 rounded-md flex flex-row justify-between mt-4 gap-2">
        <div className="text-sm text-black font-primary w-fit flex items-center">
          <span className="bg-purple-200 p-1 rounded-md mr-2">
            {post.userName}{" "}
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-800 text-white rounded-md shadow-sm font-semibold px-1"
        >
          Edit
        </button>
        <EditPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          post={post}
        />

        {/* {username === post.userName && (
          <div className="text-sm text-purple-500 font-semibold underline decoration-purple-500 w-fit flex items-center justify-center">
            {post.userName}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PostCard;
