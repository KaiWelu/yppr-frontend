import { useState } from "react";
import { useAuth } from "@/context/authProvider";
import { useCreatePost } from "@/hooks/usePosts";
import React from "react";
import { PostRequest } from "@/types/PostRequest";

const CreatePostForm = () => {
  //state management for the form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { isAuthenticated, token, username } = useAuth();

  const handleReset = () => {
    setContent("");
    setTitle("");
  };

  const {
    mutate: createPost,
    isPending,
    isError,
    err,
  } = useCreatePost(handleReset); // this will run un success and reset the form

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

  return (
    <section className="w-full justify-items-center font-primary font-light mt-6">
      {isAuthenticated && token && (
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
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 text-xl mt-4"
          >
            Post it!
          </button>
        </form>
      )}
    </section>
  );
};

export default CreatePostForm;
