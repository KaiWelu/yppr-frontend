/* "use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/authApi";
import { useAuth } from "@/context/authProvider";

const useLogin = () => {
  const { login } = useAuth(); //sets token global

  const mutation = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ token, username }) => {
      login(token, username); // store in localStorage or context
    },
    onError: (err: any) => {
      console.log("Login error: " + err.message);
    },
  });
};

export default useLogin;
 */
