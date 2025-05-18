import { Book } from '../interfaces/bookInterfaces';

export async function getBookById(id: string): Promise<Book> {
  const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
  const token = localStorage.getItem('authToken') || '';

  const response = await fetch(`${apiUrl}/api/books/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Erro ao buscar o livro');
  }
 
  console.log('URL:', `${apiUrl}/api/books/${id}`)
  return await response.json();

  
}
