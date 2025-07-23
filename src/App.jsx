import { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import MoviesCardPopular from "./components/MostlySearchMovieCard";
import PaginationButton from "./components/Pagination";
import { useDebounce } from "react-use";
import { updateSearchCount, getMostSearchedMovies } from "./appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [mostSearchedMovies, setMostSearchedMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debugging the search term to prevent making too many API request
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm]);

  const mostlySearchedMovies = async () => {
    try {
      const movies = await getMostSearchedMovies();

      setMostSearchedMovies(movies);

    } catch (error) {
      console.error("Error fetching mosty searched movies:");
    }
  }

  const fetchMovies = async (query = '', page = 1) => {

    setIsLoading(true);
    setErrorMessage('');

    try {

      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc&include_adult=false&page=${page}';`
      : `${API_BASE_URL}/discover/movie?page=${page}&include_adult=false`;

      const response = await fetch(endpoint, API_OPTIONS);
      
      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if(data.Response === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovieList([]);
          return;
      }

      setMovieList(data.results || []);
      setTotalPages(data.total_pages || 1);

      if (query.trim() !== '' && data.results.length > 0) {
        const firstTitle = data.results[0]?.title || '';
        await updateSearchCount(firstTitle, data.results[0]);
      }


    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm, currentPage);
  }, [debouncedSearchTerm, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    mostlySearchedMovies();
  }, []);

  return (
    <main>

      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Love to Watch </h1>
        </header>

       <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 

      {mostSearchedMovies.length > 0 && (
        <section className="trending">
          <h2>Mostly Searched</h2>

          <ul>
            {mostSearchedMovies.map((popularMovie, index) => (
              <MoviesCardPopular key={popularMovie.$id} moviePopular={popularMovie} index={index} />
            ))}
          </ul>
          
       </section>
      )}
       
       <section className="all-movies">
          <h2 className="mt-[10px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movieList.length === 0 ? (
            <p className="text-white">Movie Not Found</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )
          }
          
       </section>

       {totalPages > 1 && (
          <PaginationButton currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        )}
       

      </div>

    </main>
  );
}

export default App