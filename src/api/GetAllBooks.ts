import { Book } from '../interfaces/bookInterfaces';

export interface GetAllBooksResponse {
  count: number;
  books: Book[];
}

export async function getAllBooks(): Promise<GetAllBooksResponse> {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem('authToken') || '';
    const response = await fetch(`${apiUrl}/api/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },

  });

  if (!response.ok) {
    throw new Error('Erro ao buscar os livros');
  }

  const books: Book[] = await response.json();
  return {
    count: books.length,
    books,
  };
}
