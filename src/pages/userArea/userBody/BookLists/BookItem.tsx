import React from "react";
import EditBookButton from "./EditBookButton";
import DeleteBookButton from "./DeleteBookButton";

function BookItem({ book, setBooks }) {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Descrição: {book.description || "Sem descrição disponível"}</p>
      <p>Ano de Publicação: {book.publishedYear || "Não informado"}</p>
      <EditBookButton book={book} />
      <DeleteBookButton book={book} setBooks={setBooks} />
    </div>
  );
}

export default BookItem;
