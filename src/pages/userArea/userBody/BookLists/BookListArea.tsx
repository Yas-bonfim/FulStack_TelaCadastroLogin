import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllBooks } from "../../../../api/GetAllBooks";
import { Book } from "../../../../interfaces/bookInterfaces";
import "./BookListArea.css";
import CreateBookWithPopup from "./BookPopUp/CreateBookWithPopup";
import BookItem from "./BookItem";

function BookListArea() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Usuário não autenticado.");
        navigate("/login");
        return;
      }

      try {
        const { books } = await getAllBooks();
        setBooks(books);
      } catch (error: any) {
        toast.error("Erro ao buscar os livros.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [navigate]);

  const handleBookCreated = async () => {
    setIsPopupOpen(false);
    try {
      const { books } = await getAllBooks();
      setBooks(books);
    } catch (error: any) {
      toast.error("Erro ao atualizar a lista de livros.");
      console.error(error);
    }
  };

  const HandleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="book-list-area">
      <header className="book-list-header">
        <h1>Minha Biblioteca</h1>
      </header>
      <button onClick={HandleLogout}>Logout</button>
      <button onClick={() => setIsPopupOpen(true)}>Criar Livro</button>
      <CreateBookWithPopup
        bookId="new"
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onBookCreated={handleBookCreated}
      />
      {isLoading ? (
        <p>Carregando livros...</p>
      ) : books.length === 0 ? (
        <p>Nenhum livro cadastrado ainda.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <BookItem key={book._id} book={book} setBooks={setBooks} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookListArea;
