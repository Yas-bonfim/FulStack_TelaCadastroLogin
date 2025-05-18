import axios from "axios";
import ErrorHandler from "./ErrorHandler";

export interface DeleteBookResponse {
  message: string;
}

async function deleteBook(
  apiUrl: string,
  token: string,
  bookId: string
): Promise<DeleteBookResponse> {
  const fullUrl = `${apiUrl}/api/books/${bookId}`;
  const timeoutSeconds = 20;

  console.log(`[DeleteBook] DELETE ${fullUrl}`);

  try {
    const response = await axios.delete<DeleteBookResponse>(fullUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 1000 * timeoutSeconds,
    });

    console.log(`[DeleteBook] Success:`, response.data);
    return response.data;
  } catch (error) {
    ErrorHandler("DeleteBook", error);
    throw error;
  }
}

export default deleteBook;
