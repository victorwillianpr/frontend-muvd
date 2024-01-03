import React, { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/outline';
import { RefreshIcon } from '@heroicons/react/outline';
import axios from 'axios';

function MovieList() {
  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPopularMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://backend-muvd.vercel.app/api/topratedmovies', {
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

    setPage(page + 1);
    if (page >= 2) {
      fetchPopularMovies(); // Chame a função para buscar mais filmes
    } // Chame a função para buscar mais filmes
  };

  return (
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
  );
}

export default MovieList;
