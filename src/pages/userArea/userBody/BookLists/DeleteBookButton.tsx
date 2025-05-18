import React from "react";
import deleteBook from "../../../../api/DeleteBook";
import { Book } from "../../../../interfaces/bookInterfaces";

interface DeleteBookButtonProps {
  book: Book;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function DeleteBookButton({ book, setBooks }: DeleteBookButtonProps) {
  const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken") || "";

  const handleDelete = async () => {
    try {
      await deleteBook(apiUrl, token, book._id); // Passa o ID do livro
      setBooks((prev) => prev.filter((b) => b._id !== book._id)); // Filtra o livro deletado
    } catch (err) {
      console.error("Erro ao deletar livro:", err);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Deletar
    </button>
  );
}

export default DeleteBookButton;
