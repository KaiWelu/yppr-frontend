import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import api from "@/api/axios";
import { Post } from "@/types/Post";
import { PaginatedResponse } from "@/types/PaginatedResponse";
import { useAuth } from "@/context/authProvider";
import { PostResponse } from "@/types/PostResponse";
import { PostRequest } from "@/types/PostRequest";
import { AxiosError } from "axios"; // this is the typing for axios errors
import { toast } from "react-toastify";

const fetchPaginatedPosts = async ({
  pageParam = 0,
  token,
  sort = "createdAt,desc",
}: {
  pageParam?: number;
  token: string;
  sort?: string;
}): Promise<PaginatedResponse<PostResponse>> => {
  const response = await api.get<PaginatedResponse<PostResponse>>("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page: pageParam,
      size: 5,
      sort,
    },
  });
  return response.data;
};

export const useInfinitePaginatedPosts = () => {
  const { token } = useAuth();

  return useInfiniteQuery({
    queryKey: ["paginated-posts"],
    queryFn: ({ pageParam }) => fetchPaginatedPosts({ pageParam, token }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.last ? undefined : allPages.length;
    },
    enabled: !!token,
  });
};

const createPost = async (newPost: Post, token: string) => {
  const response = await api.post<Post>("/posts", newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreatePost = (onSuccessCallback?: () => void) => {
  const { token } = useAuth(); // this gets the token from the context
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost: Post) => createPost(newPost, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginated-posts"] }); // this will invalidate and refetch after creation
      if (onSuccessCallback) onSuccessCallback(); // this will call a callback function on success
    },
    onError: (err: AxiosError) => {
      // this ensures correct typing of the error response
      const errorData = err.response?.data as Record<string, string>;
      /* console.log(Array.isArray(errorData)); */
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

const updatePost = async (
  id: number,
  updatedPost: PostRequest,
  token: string
) => {
  const response = await api.put<PostRequest>(`/posts/${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useUpdatePost = (onSuccessCallback?: () => void) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedPost,
    }: {
      id: number;
      updatedPost: PostRequest;
    }) => updatePost(id, updatedPost, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginated-posts"] });
      if (onSuccessCallback) onSuccessCallback(); // this will call a callback function on success
    },
  });
};

const deletePost = async (id: number, token: string) => {
  await api.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useDeletePost = (onSuccessCallback?: () => void) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePost(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paginated-posts"] });
      if (onSuccessCallback) onSuccessCallback(); // this will call a callback function on success
    },
  });
};
