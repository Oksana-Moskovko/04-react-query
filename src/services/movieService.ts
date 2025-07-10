import axios from "axios";
import type { Movie } from "../types/movie";

const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface MovieAxiosResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (query: string, page: number = 1): Promise<MovieAxiosResponse> => {
  const response = await axios.get<MovieAxiosResponse>("https://api.themoviedb.org/3/search/movie", {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });
  
  return response.data;
}