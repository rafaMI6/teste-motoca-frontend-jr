import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { getUserPosts, type Post } from "../services/api";

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserModal({user, onClose}: UserModalProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    let isMounted = true;
  
  const fetchPosts = async () => {
    if (user && isMounted) {
      try {
        setLoadingPosts(true);
        const response = await getUserPosts(user.id);
        
        if (isMounted) {
          setPosts(response);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Erro ao buscar posts', err);
        }
      } finally {
        if (isMounted) {
          setLoadingPosts(false);
        }
      }
    }
  };
  
  fetchPosts();
  
  // Cleanup function
  return () => {
    isMounted = false;
  };
  }, [user]);

  const fields = [
    { label: "Email", value: user?.email },
    { label: "Telefone", value: user?.phone },
    { label: "Empresa", value: user?.company.name },
    { label: "Cidade", value: user?.address.city }
  ];

  if (!user) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col'
        onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
      >
        <div
          className='p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50 rounded-t-xl'
        >
          <div>
            <div>
              <h2 className='text-2xl font-bold text-gray-800'>{user.name}</h2>
              <p className='text-gray-500'>@{user.username}</p>
            </div>
            <div className='p-2 lg:p-6 space-y-8 overflow-y-auto'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {
                  fields.map((field, index) => (
                    <div key={index} className='space-y-1'>
                      <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>{field.label}</p>
                      <p className='text-gray-800 font-medium'>{field.value}</p>
                    </div>
                  ))
                }
              </div>

              <hr className='border-gray-100' />

              <h3 className='text-lg font-bold text-gray-800 mb-4 flex items-center gap-2'>
                Ultimas Publicações
              </h3>

              {
                loadingPosts ? (
                  <div className='text-center py-8'>
                    <div className='animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto'></div>
                    <p className='text-sm text-gray-400 mt-2'>Carregando posts...</p>
                  </div>
                ) : (
                  <ul className='space-y-3'>
                    {posts.slice(0, 3).map((post) => (
                      <li key={post.id} className='bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors'>
                        <h4 className='font-semibold text-gray-800 text-sm capitalize mb-1'>
                          {post.title}
                        </h4>
                        <p className='text-xs text-gray-500 line-clamp-2'>
                          {post.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                )
              }
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2 transition-colors'
          >
            X
          </button>
        </div>
      </div>
    </div>
  )
}