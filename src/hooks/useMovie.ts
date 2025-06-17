import { useQuery } from "@tanstack/react-query";

type Movie = {
  id: number;
  title: string;
  director: string;
  duration: number;
  rating: number;
  hasOscars: boolean;
  description: string;
  releaseYear: string;
};

const fetchMovie = async (): Promise<Movie> => {
  const response = await fetch("http://localhost:7070/testMovie");
  const data = await response.json();
  return data;
};

const useMovie = () => {
  return useQuery({
    queryKey: ["Movie"],
    queryFn: () => fetchMovie(),
  });
};

export { useMovie, fetchMovie };
