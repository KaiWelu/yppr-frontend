"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";

const LoginForm = () => {
  const { login } = useAuth();

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
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <input name="password" placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
