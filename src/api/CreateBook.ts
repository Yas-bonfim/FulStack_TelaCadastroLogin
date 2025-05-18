import axios from 'axios';
import { Book } from '../interfaces/bookInterfaces';

interface CreateBookPayload {
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
}

export async function createBook(newBook: CreateBookPayload): Promise<Book> {
  try {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem('authToken') || '';

    // Log detalhado da requisição
    console.log('Requisição para o backend:');
    console.log('URL:', `${apiUrl}/api/books`);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    console.log('Payload:', newBook);

    const response = await axios.post<Book>(`${apiUrl}/api/books`, newBook, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    throw new Error('Erro ao criar livro');
  }
}
