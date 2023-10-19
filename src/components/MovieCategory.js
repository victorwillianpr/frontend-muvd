import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlayIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/outline';
import { RefreshIcon } from '@heroicons/react/outline';
import { ArrowDownIcon } from '@heroicons/react/outline';



function MovieList() {
  const [query, setQuery] = useState(''); // Valor padrão vazio
  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/api/moviecategory', { query })
      .then((response) => {
        setResultado(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      });
  };

  const fetchMoreMovies = async () => {
    setPage(page+1);
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/moremoviecategory', { query, page: page+1, })
    ;
      setResultado([...resultado, ...response.data]);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3001/api/popularmovies', {
      page: page,
    });
      setResultado([...resultado, ...response.data]);
      setLoading(false);

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const handleLoadMore = () => {
        fetchMoreMovies(); // Chame a função para buscar mais filmes
       // Chame a função para buscar mais filmes
  };

  return (
    <div className="bg-#131313 p-4 text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-full bg-white p-3 hover:bg-gray-100 hover:border-gray-800 border-4 transition duration-1000 ease-in-out">
          <select className="appearance-none cursor-pointer flex-grow bg-transparent outline-none text-black w-full" value={query} onChange={handleQueryChange}>
            <option value=""></option>
            <option value="28">Action</option>
            <option value="16">Animation</option>
            <option value="12">Adventure</option>
            <option value="35">Comedy</option>
            <option value="80">Crime</option>
            <option value="99">Documentary</option>
            <option value="18">Drama</option>
            <option value="10751">Family</option>
            <option value="14">Fantasy</option>
            <option value="36">Historic</option>
            <option value="27">Horror</option>
            <option value="10402">Musical</option>
            <option value="9648">Mystery</option>
            <option value="10749">Romance</option>
            <option value="10770">TV movies</option>
            <option value="53">Thriller</option>
            <option value="10752">War</option>
            <option value="37">Western</option>
          </select>
          <button className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition duration-300" type="submit"><ArrowDownIcon className="text-black h-5 w-5 hover:text-white" /></button>
        </div>
      </form>
      <div className="bg-#131313 p-4 text-white">
        {resultado.map((movie, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow-md my-4 flex"
          >
            <img
              width={100} height={150}
              src={movie.poster}
              alt={movie.title}
              className="mr-4 rounded"
            />
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.overview}</p>
              {movie.latestTrailerKey && (
                <div className="mt-2 flex items-center">
                  <a href={`https://www.youtube.com/watch?v=${movie.latestTrailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <PlayIcon className="text-red-500 h-5 w-5 mr-2" /></a>
                  <a
                    href={`https://www.youtube.com/watch?v=${movie.latestTrailerKey}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline text-xs"
                  >
                    Trailer on YouTube
                  </a>
                  <a>
                    <StarIcon className="ml-5 text-xs text-yellow-300 h-5 w-5 mr-2" /></a>
                  <p className="text-xs text-yellow-300">{movie.averageRating}</p>
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={handleLoadMore}
          className="bottom-4 right-4 bg-gray-800 hover:bg-gray-700 transition duration-300 text-white py-2 px-4 rounded-full cursor-pointer flex items-center"
          >
            <RefreshIcon className="text-gray-500 h-5 w-5 hover:text-white transition duration-300" />
            {loading && <p className="text-gray-500 ml-4 hover:text-white transition duration-300">Loading...</p>}
          </button>
      </div>
    </div>
  );
}

export default MovieList;