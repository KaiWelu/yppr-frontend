import React, { useEffect, useState } from "react";
import { useDeletePost } from "@/hooks/usePosts";
import { useAuth } from "@/context/authProvider";
import { PostResponse } from "@/types/PostResponse";

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

  /* const { mutate: createPost } = useCreatePost(() => {
    onClose(); // this will close the modal
  }); */

  const handleDeletePost = (e: React.FormEvent) => {
    e.preventDefault();
    deletePost(post.id);
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
          className="flex flex-col p-4 gap-4 bg shadow-xl bg-white/90 w-full"
        >
          <input
            name="title"
            placeholder="Title"
            className=" py-2 px-2 bg-purple-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            placeholder="Yap it out..."
            className="py-2 px-2  bg-purple-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="bg-red-300 text-white font-semibold py-2 text-xl"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white font-semibold py-2 text-xl"
            onClick={handleDeletePost}
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 text-xl"
          >
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditPostModal;
