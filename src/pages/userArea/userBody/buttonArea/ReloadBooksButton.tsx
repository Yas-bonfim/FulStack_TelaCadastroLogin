import React from "react";
import { getAllBooks } from "../../../../api/GetAllBooks";

function ReloadBooksButton({ setBooks, setCount }: { setBooks: any, setCount: any }) {
  async function handleGetBooks() {
    const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
    const token = localStorage.getItem("authToken") || "";
    try {
      const result = await getAllBooks();
      setBooks(result.books);
      setCount(result.count);
      console.log(`Number of books found: ${result.count}`);
    } catch (err) {
      // ErrorHandler will handle errors in GetAllBooks
    }
  }

  return (
    <button onClick={handleGetBooks} className="button-area-button">
      Reload Books
    </button>
  );
}

export default ReloadBooksButton;