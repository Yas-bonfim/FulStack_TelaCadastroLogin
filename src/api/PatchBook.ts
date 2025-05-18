// src/api/PatchBook.ts
import axios from "axios";
import { Book } from "../interfaces/bookInterfaces";
import ErrorHandler from "./ErrorHandler";

export interface PatchBookResponse {
  data: Book;
}

async function PatchBook(
  apiUrl: string,
  token: string,
  bookId: string,
  partialBook: Partial<Book>
): Promise<PatchBookResponse> {
  const fullUrl = `${apiUrl}/api/books/${bookId}`;
  const timeoutSeconds = 20;

  console.log(`[PatchBook] PATCH ${fullUrl}`);
  console.log(`[PatchBook] Payload:`, partialBook);

  try {
    const response = await axios.patch<Book>(
      fullUrl,
      partialBook,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        timeout: 1000 * timeoutSeconds,
      }
    );
    console.log(`[PatchBook] Success:`, response.data);
    return { data: response.data };
  } catch (error) {
    ErrorHandler("PatchBook", error);
    throw error;
  }
}

export default PatchBook;
