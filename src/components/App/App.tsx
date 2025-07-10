import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import css from '../App/App.module.css';
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from "../../services/movieService";
 import ReactPaginate from 'react-paginate';


export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);


  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', searchQuery, page],  
    queryFn: () => fetchMovies(searchQuery, page),  
    enabled: searchQuery !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  useEffect(() => {
  if (isSuccess && data?.results.length === 0) {
    toast.error("No movies found for your request.");
  }
}, [data, isSuccess]);
  
  return (
    <>
      <div className={css.app}> 
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBar onSubmit={handleSearchSubmit} />
        {isSuccess && totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            breakLabel="..."
            nextLabel="→"
            previousLabel="←"
            renderOnZeroPageCount={null}
      />
        )}
        {data && data.results.length > 0 &&
        <MovieGrid movies={data.results ?? []} onSelect={handleSelectMovie}/>}
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {selectedMovie && (
          <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>

    </>
  )
}