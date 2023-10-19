import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { FilmIcon } from '@heroicons/react/solid';
import { FireIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@heroicons/react/solid';
import { MenuIcon } from '@heroicons/react/solid';
import MovieSearch from './MovieSearch';
import MovieDiscover from './MovieDiscover';
import MovieTopRated from './MovieTopRated';
import MovieCategory from './MovieCategory';

function App() {
  const [mostrarMovieSearch, setMostrarMovieSearch] = useState(false);
  const [mostrarMovieDiscover, setMostrarMovieDiscover] = useState(false);
  const [mostrarMovieTopRated, setMostrarMovieTopRated] = useState(false);
  const [mostrarMovieCategory, setMostrarMovieCategory] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('search');

  const handlemostrarMovieSearch = () => {
    setSelectedMenuItem('search');
    setMostrarMovieSearch(true);
    setMostrarMovieDiscover(false);
    setMostrarMovieTopRated(false);
    setMostrarMovieCategory(false);
  };

  const handlemostrarMovieDiscover = () => {
    setSelectedMenuItem('discover');
    setMostrarMovieSearch(false);
    setMostrarMovieDiscover(true);
    setMostrarMovieTopRated(false);
    setMostrarMovieCategory(false);
  };

  const handlemostrarMovieTopRated = () => {
    setSelectedMenuItem('topRated');
    setMostrarMovieTopRated(true);
    setMostrarMovieSearch(false);
    setMostrarMovieDiscover(false);
    setMostrarMovieCategory(false);
  };

  const handlemostrarMovieCategory = () => {
    setSelectedMenuItem('category');
    setMostrarMovieCategory(true);
    setMostrarMovieTopRated(false);
    setMostrarMovieSearch(false);
    setMostrarMovieDiscover(false);
  };

  return (
    <div className="bg-#131313 p-4 text-white font-arial flex">
      <FilmIcon className="w-6 h-6 text-gray-500 fixed" />
      <div className="bg-#131313 text-white w-64 p-4 flex flex-col fixed h-screen overflow-y-auto">
        <h2 className="text-2xl opacity-30">muvd</h2>
        <ul className="mt-4">
          <li
            className={`mb-2 flex items-center cursor-pointer ${
              selectedMenuItem === 'search' ? 'bg-gray-700' : ''
            } rounded-lg transition duration-300 hover:bg-gray-700`}
            onClick={handlemostrarMovieSearch}
          >
            <button className="bg-transparent text-white p-2 rounded-r">
              <SearchIcon className="h-5 w-5" />
            </button>
            <button onClick={handlemostrarMovieSearch}>Search</button>
          </li>
          <li
            className={`mb-2 flex items-center cursor-pointer ${
              selectedMenuItem === 'category' ? 'bg-gray-700' : ''
            } rounded-lg transition duration-300 hover:bg-gray-700`}
            onClick={handlemostrarMovieCategory}
          >
            <button className="bg-transparent text-white p-2 rounded-r">
              <MenuIcon className="h-5 w-5" />
            </button>
            <button onClick={handlemostrarMovieCategory}>Categories</button>
          </li>
          <li
            className={`mb-2 flex items-center cursor-pointer ${
              selectedMenuItem === 'discover' ? 'bg-gray-700' : ''
            } rounded-lg transition duration-300 hover:bg-gray-700`}
            onClick={handlemostrarMovieDiscover}
          >
            <button className="bg-transparent text-white p-2 rounded-r">
              <FireIcon className="h-5 w-5" />
            </button>
            <button onClick={handlemostrarMovieDiscover}>Popular</button>
          </li>
          <li
            className={`mb-2 flex items-center cursor-pointer ${
              selectedMenuItem === 'topRated' ? 'bg-gray-700' : ''
            } rounded-lg transition duration-300 hover:bg-gray-700`}
            onClick={handlemostrarMovieTopRated}
          >
            <button className="bg-transparent text-white p-2 rounded-r">
              <CheckIcon className="h-5 w-5" />
            </button>
            <button onClick={handlemostrarMovieTopRated}>Top Rated</button>
          </li>
        </ul>
      </div>
      <div className="ml-64 p-4">
        {mostrarMovieDiscover && <MovieDiscover />}
        {mostrarMovieSearch && <MovieSearch />}
        {mostrarMovieTopRated && <MovieTopRated />}
        {mostrarMovieCategory && <MovieCategory />}
      </div>
    </div>
  );
}

export default App;
