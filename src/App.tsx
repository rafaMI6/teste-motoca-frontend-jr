import { useState, useEffect } from 'react'
import { getUsers } from './services/api';

function App() {

  useEffect(() => {
    getUsers().then((data) => console.log("dados recebidos:", data));
  }, []);

  return (
   <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-600">
        Teste de API (Olhe o Console)
      </h1>
    </div>
  );
};

export default App;
