"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";

const LoginForm = () => {
  const router = useRouter();
  const { login, isAuthenticated, logout, token } = useAuth();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => {
      login(token);
      router.push("/feed");
    },
    onError: (err) => alert(err.message),
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
            className=" py-2 px-1 border-b-1 border-fuchsia-400"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="py-2 px-1 border-b-1 border-fuchsia-400"
          />

          <button
            type="submit"
            className="bg-fuchsia-400 text-white font-semibold py-2 text-xl mt-4"
          >
            Login
          </button>
        </form>
      )}
      {isAuthenticated && token && (
        <div className="bg-amber-200 flex flex-col p-4 gap-2">
          <p>User is loggend in with token </p>
          <p>{localStorage.getItem("token")}</p>
          <button className="bg-red-300 p-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

export default LoginForm;
