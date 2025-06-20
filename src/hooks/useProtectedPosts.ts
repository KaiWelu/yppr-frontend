import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";
import { Post } from "@/types/Post";

const fetchProtectedPosts = async (token: string): Promise<Post[]> => {
  const response = await api.get<Post[]>("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

/* export const useProtectedPosts = (token: string) => {
  return useQuery(["protected-posts"], () => fetchProtectedPosts(token), {
    
  }  
  );
};
 */
export const useProtectedPosts = (token: string) => {
  return useQuery({
    queryKey: ["portected-posts"],
    queryFn: () => fetchProtectedPosts(token),
    enabled: !!token, // only does a fetch if a token exists
  });
};
