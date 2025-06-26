import { PostResponse } from "@/types/PostResponse";
import React from "react";
import { useAuth } from "@/context/authProvider";
import { getFormattedDate } from "@/util/getFormattedDate";
import { useState } from "react";
import { motion } from "motion/react";
import EditPostModal from "../ui/EditPostModal";

const PostCard = ({ post }: { post: PostResponse }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useAuth();

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        scale: { type: "spring", visualDuration: 0.5, bounce: 0.1 },
      }}
      className="bg-white/90 rounded-md py-3 px-4 mx-2 shadow-sm lg:mx-8"
    >
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
        {username === post.userName && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white rounded-md shadow-sm font-semibold px-1"
          >
            Edit
          </button>
        )}
        <EditPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          post={post}
        />
      </div>
    </motion.div>
  );
};

export default PostCard;
