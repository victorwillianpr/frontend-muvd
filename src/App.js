import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar'
import { ChevronUpIcon } from '@heroicons/react/outline';
function App() {

  const [showButton, setShowButton] = useState(false);

  // Função para rolar a página para o topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adicionar um observador de rolagem para mostrar o botão quando o usuário rolar para baixo
  window.onscroll = () => {
    if (document.documentElement.scrollTop > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  return (
    <div className="bg-#131313 p-4 text-white ">
      <Sidebar/>
      <button
          className="fixed bottom-4 right-4 hover:bg-gray-700 transition duration-300 bg-gray-800 text-white py-2 px-4 rounded-full cursor-pointer"
          onClick={scrollToTop}
        >
          <ChevronUpIcon className="text-gray-500 h-5 w-5 hover:text-white" />
        </button>
  </div>
  );
}

export default App;
