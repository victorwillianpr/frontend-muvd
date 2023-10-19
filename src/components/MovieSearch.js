import React, { useState } from 'react';
import axios from 'axios';
import { ArrowDownIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/outline';

function MovieList() {
  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3001/api/moviesearch', { query })
      .then((response) => {
        setResultado(response.data); // Resultado é um array de objetos com title, overview e poster
      })
      .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  };

  return (
    <div className="bg-#131313 p-4 text-white">
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-full bg-white p-3 hover:bg-gray-100 hover:border-gray-800 border-4 transition duration-1000 ease-in-out">
          <input
            className="clearable flex-grow bg-transparent outline-none text-gray-800 w-full"
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search movies here..."
          />
          <button
            className="hover:bg-gray-700 hover:text-white p-2 rounded-full transition duration-300"
            type="submit"
          >
            <ArrowDownIcon className="text-black h-5 w-5 hover:text-white" />
          </button>
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
      </div>
    </div>
  );
}

export default MovieList;
