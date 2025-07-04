import React, { useEffect, useState } from "react";
import { useDeletePost } from "@/hooks/usePosts";
import { useAuth } from "@/context/authProvider";
import { PostResponse } from "@/types/PostResponse";
import { useUpdatePost } from "@/hooks/usePosts";
import { PostRequest } from "@/types/PostRequest";
import { X, Save, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostResponse;
}

const EditPostModal = ({ isOpen, onClose, post }: ModalProps) => {
  //state management for the form
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const { username } = useAuth();

  const { mutate: deletePost } = useDeletePost(() => onClose());
  const { mutate: updatePost } = useUpdatePost(() => onClose());

  /* const { mutate: createPost } = useCreatePost(() => {
    onClose(); // this will close the modal
  }); */

  const handleDeletePost = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost(post.id);
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPost: PostRequest = {
      title: title,
      content: content,
      userName: username,
      tags: [],
    };
    console.log(updatedPost);
    updatePost({ id: post.id, updatedPost }); // sends the parameters as object
  };

  // this will disable scrolling if the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center backdrop-blur-md bg-black/30">
      <section className="w-10/12 lg:w-1/3 justify-items-center font-primary font-light mt-14">
        <form
          /* onSubmit={} */
          className="flex flex-col p-4 gap-4 bg shadow-xl bg-white/90 w-full rounded-md"
        >
          <div className="w-full flex flex-col gap-1">
            <p>Title:</p>
            <input
              name="title"
              placeholder="Title"
              className=" py-2 px-2 bg-purple-200 font-quicksand"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <p>Post:</p>
            <textarea
              rows={5}
              name="content"
              placeholder="Yap it out..."
              className="py-2 px-2  bg-purple-200 font-quicksand"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-row justify-center gap-8 my-2 items-center font-primary">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-purple-500 hover:text-red-500 flex flex-col justify-center items-center"
              onClick={handleDeletePost}
            >
              <Trash2 size={26} />
              Delete
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              type="submit"
              className="text-purple-500 hover:text-green-500 flex flex-col justify-center items-center"
              onClick={handleUpdatePost}
            >
              <Save size={26} />
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="text-purple-500 hover:text-purple-600 flex flex-col justify-center items-center"
              onClick={onClose}
            >
              <X size={26} />
              Close
            </motion.button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EditPostModal;
