import { useState, useEffect } from 'react';
import { UserCard } from './components/UserCard';
import { getUsers } from './services/api';
import type { User } from './types/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => setError('Erro ao carregar usuários. Verifique sua conexão.'))
      .finally(() => setLoading(false));
  }, []);

  const handleUserClick = (user: User) => {
    console.log("clicou no usuário", user.name);
  };

  return (
   <div className='min-h-screen bg-gray-50 p-8 font-sans'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          Dashboard de Usuários
        </h1>
          {loading && (
            <div className='text-center py-10'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto'></div>
              <p className='mt-4 text-gray-600'>Carregando dados...</p>
            </div>
          )}

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center'>
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              { users.map((user) => (
                <UserCard key={user.id} user={user} onClick={handleUserClick} />
              ))}
            </div>
          )}
      </div>
    </div>
  )
};

export default App;
