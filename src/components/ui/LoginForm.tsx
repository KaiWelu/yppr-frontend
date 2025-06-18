"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";

const LoginForm = () => {
  const { login, isAuthenticated, logout, token } = useAuth();

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => login(token),
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
    <section className="w-full justify-items-center">
      {!isAuthenticated && !token && (
        <form
          onSubmit={handleSubmit}
          className="bg-amber-200 flex flex-col p-4 gap-2"
        >
          <input
            name="username"
            placeholder="Username"
            className="bg-green-50 p-2"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="bg-green-50 p-2"
          />

          <button type="submit" className="bg-green-300">
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
