import React, { useEffect, useState } from "react";
import { useCreatePost } from "@/hooks/usePosts";
import { useAuth } from "@/context/authProvider";
import { PostRequest } from "@/types/PostRequest";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: ModalProps) => {
  //state management for the form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { username } = useAuth();

  const handleReset = () => {
    setContent("");
    setTitle("");
  };

  const { mutate: createPost } = useCreatePost(() => {
    handleReset(); // this will run un success and reset the form
    onClose(); // this will close the modal
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: PostRequest = {
      title,
      content,
      userName: username,
      tags: [],
    };
    createPost(newPost);
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
          onSubmit={handleSubmit}
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
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 text-xl"
          >
            Post it!
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreatePostModal;
