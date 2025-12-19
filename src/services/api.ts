import type { User } from '../types/User';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}` );
    };
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}