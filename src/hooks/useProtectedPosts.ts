import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { Post } from "@/types/Post";
import { useAuth } from "@/context/authProvider";

const fetchProtectedPosts = async (token: string): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createPost = async (newPost: Post, token: string) => {
  const response = await api.post<Post>("/posts", newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useProtectedPosts = () => {
  const { token } = useAuth(); // this gets the token from the context

  return useQuery({
    queryKey: ["protected-posts"],
    queryFn: () => fetchProtectedPosts(token),
    enabled: !!token, // only does a fetch if a token exists
  });
};

export const useCreatePost = () => {
  const { token } = useAuth(); // this gets the token from the context
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: Post) => createPost(newPost, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["protected-posts"] }); // this will invalidate and refetch after creation
    },
  });
};
