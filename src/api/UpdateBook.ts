// src/api/UpdateBook.ts
import axios from "axios";
import { Book } from "../interfaces/bookInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface UpdateBookResponse {
  data: Book;
}

async function UpdateBook(
  apiUrl: string,
  token: string,
  bookId: string,
  updatedBook: Book
): Promise<UpdateBookResponse> {
  const fullUrl = `${apiUrl}/api/books/${bookId}`;
  const timeoutSeconds = 20;

  console.log(`[UpdateBook] PUT ${fullUrl}`);
  console.log(`[UpdateBook] Payload:`, updatedBook);

  try {
    const response = await axios.put<Book>(
      fullUrl,
      updatedBook,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[UpdateBook] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    ErrorHandler("UpdateBook", error);
    throw error;
  }
}

export default UpdateBook;
