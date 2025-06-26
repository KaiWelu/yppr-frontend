"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { login, isAuthenticated, token } = useAuth();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => {
      login(token);
    },
    onError: (err) => toast.error("" + err), // this can be a toast
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    mutation.mutate({ name, password });
  };

  return (
    <section className="w-full justify-items-center font-primary font-light">
      {!isAuthenticated && !token && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-4 gap-2 bg shadow-xl rounded-lg bg-white/50"
        >
          <input
            name="username"
            placeholder="Username"
            className=" py-2 px-1 border-b-1 border-purple-500"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="py-2 px-1 border-b-1 border-purple-500"
          />

          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold py-2 text-xl mt-4"
          >
            Login
          </button>
        </form>
      )}
    </section>
  );
};

export default LoginForm;
