"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";
import { toast } from "react-toastify";
import { motion } from "motion/react";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRegister } from "@/hooks/useRegister";

const LoginForm = () => {
  const { login, isAuthenticated, token } = useAuth();
  const [isRegistration, setIsRegistration] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // this is the registration hook
  const { mutate: register } = useRegister(() => {
    /* console.log("Data in mutate" + data.name); */
    setIsRegistration(false);
    setPassword("");
    setEmail("");
  });

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => {
      login(token);
      setPassword("");
      setName("");
      setEmail("");
    },
    onError: (err: AxiosError) => {
      // this ensures correct typing of the error response
      const errorData = err.response?.data as Record<string, string>;
      console.log(errorData);
      if (errorData && typeof errorData === "object") {
        Object.entries(errorData).forEach((message) => {
          toast.error(message[1]);
        });
      }
    },
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    register({ name, email, password });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegistration) return; //prevents submits while the registration form is open

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isRegistration && !isAuthenticated && !token && (
            <motion.input
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              name="email"
              placeholder="E-Mail"
              className=" py-2 px-1 border-b-1 border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="py-2 px-1 border-b-1 border-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistration ? (
            <div className="flex flex-col gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="button"
                className="bg-red-300 hover:bg-red-400 text-white font-semibold py-2 text-xl rounded-md shadow-md"
                onClick={() => setIsRegistration(false)}
              >
                Cancel
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 text-xl rounded-md shadow-md"
                onClick={handleRegistration}
              >
                Create New
              </motion.button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 text-xl rounded-md shadow-md"
              >
                Login
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 text-xl rounded-md shadow-md"
                onClick={() => setIsRegistration(true)}
              >
                Create Account
              </motion.button>
            </div>
          )}
        </form>
      )}
    </section>
  );
};

export default LoginForm;
