import React from "react";
import { Book } from "../../../../interfaces/bookInterfaces";
import { useNavigate } from "react-router-dom";

interface BookProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function CreateBookButton({ setBooks }: BookProps) {
  const navigate = useNavigate();

  function handleCreateBook() {
    navigate('/book/new');
  }

  return (
    <>
      <button onClick={handleCreateBook} className="button-area-button">Create New Book</button>
    </>
  );
}

export default CreateBookButton;
