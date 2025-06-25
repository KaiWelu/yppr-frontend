/* "use client";

// this hook is not in use right now

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";

const useLogin = () => {
  const { login } = useAuth(); //sets token global

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (token) => {
      login(token); // store in localStorage or context
    },
    onError: (err: any) => {
      console.log("Login error: " + err.message);
    },
  });
};

export default useLogin;
 */
