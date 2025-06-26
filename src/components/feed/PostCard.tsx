import React from "react";
import { PostResponse } from "@/types/PostResponse";
import { useAuth } from "@/context/authProvider";
import { getFormattedDate } from "@/util/getFormattedDate";
import { useState } from "react";
import { motion } from "motion/react";
import { SquarePen } from "lucide-react";
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
      <h2 className="text-3xl font-primary mb-1">{post.title}</h2>
      <p className="font-quicksand font-light text-lg">{post.content}</p>
      <p className="text-purple-400 font-semibold mt-2">{post.userName} </p>
      <div className="h-8 rounded-md flex flex-row justify-between">
        <div className="text-sm text-black font-primary w-fit flex items-center">
          <p className="font-primary font-light">
            Posted at:{" " + getFormattedDate(post.createdAt)}
          </p>
        </div>
        {username === post.userName && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            onClick={() => setIsModalOpen(true)}
            className="text-purple-400 hover:text-pink-400"
          >
            <SquarePen size={22} />
          </motion.button>
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
