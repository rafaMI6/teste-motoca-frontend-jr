import { useState, useEffect } from 'react';
import { UserCard } from './components/UserCard';
import { UserModal } from './components/UserModal';
import { getUsers } from './services/api';
import type { User } from './types/User';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch(() => setError('Erro ao carregar usuários. Verifique sua conexão.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase()) )

  return (
   <div className='min-h-screen bg-gray-50 p-8 font-sans'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
          Dashboard de Usuários
        </h1>
          <div className='mb-8 max-w-md mx-auto'>
            <input
              type="text"
              placeholder='Buscar por nome...'
              value={searchTerm}
              onChange={({target}) => setSearchTerm(target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'           
            />
          </div>

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
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={(user) => setSelectedUser(user)}
                />
              ))}
            </div>
          )}
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
      </div>
    </div>
  )
};

export default App;
