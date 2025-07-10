import { useState } from "react";
import css from '../App/App.module.css';
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
 import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const handleMovie = async (query: string) => {
    try {
      setIsLoading(true);
      setError(false)
      setMovies([])
      const fetchedMovies = await fetchMovies(query)
      if (!fetchedMovies || fetchedMovies.length === 0) {
        toast.error("No movies found for your request.");
        return
      }
      setMovies(fetchedMovies)
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  };
  
  return (
    <>
      <div className={css.app}> 
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <SearchBar onSubmit={handleMovie}/>
        <MovieGrid movies={movies} onSelect={handleSelectMovie}/>
        {isLoading && <Loader />}
        {error && <ErrorMessage />}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>

    </>
  )
}