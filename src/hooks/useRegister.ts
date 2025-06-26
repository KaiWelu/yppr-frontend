import { UserRegisterRequest } from "@/types/UserRegisterRequest";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios";
import { AxiosError } from "axios"; // this is the typing for axios errors
import { toast } from "react-toastify";

const registerUser = async (name: string, email: string, password: string) => {
  const newUser: UserRegisterRequest = {
    name,
    email,
    password,
  };

  const response = await api.post<UserRegisterRequest>("/register", newUser);
  return response.data;
};

export const useRegister = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return registerUser(name, email, password);
    },
    onSuccess: (data) => {
      //this only fires on success
      console.log("User registered:" + data);
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err: AxiosError) => {
      // this ensures correct typing of the error response
      const errorData = err.response?.data as Record<string, string>;
      console.log(errorData);
      if (errorData && typeof errorData === "object") {
        Object.entries(errorData).forEach((message) => {
          toast.error(message[1]);
        });
      } else {
        toast.error("An unexpected error occured!");
      }
    },
  });
};
