import React, { useState } from "react";
import CreateBookWithPopup from "./BookPopUp/CreateBookWithPopup";
import { Book } from "../../../../interfaces/bookInterfaces";

interface EditBookButtonProps {
  book: Book;
}

function EditBookButton({ book }: EditBookButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsPopupOpen(true)}>Editar</button>
      <CreateBookWithPopup
        bookId={book._id}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onBookCreated={() => setIsPopupOpen(false)}
      />
    </>
  );
}

export default EditBookButton;
