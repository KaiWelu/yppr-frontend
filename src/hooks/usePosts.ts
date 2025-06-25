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

const fetchPaginatedPosts = async ({
  pageParam = 0,
  token,
  sort = "createdAt,asc",
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
  });
};
