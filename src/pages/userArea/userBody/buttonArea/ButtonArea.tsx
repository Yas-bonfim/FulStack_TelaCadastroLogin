import React, { useEffect, useRef } from "react";
import "./ButtonArea.css";
import CreateBookButton from "./CreateBookButton";
import ReloadBooksButton from "./ReloadBooksButton";
import {getAllBooks} from "../../../../api/GetAllBooks";
import { Book } from "../../../../interfaces/bookInterfaces";

interface ButtonAreaProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setCount: (count: number) => void;
}

function ButtonArea({ setBooks, setCount }: ButtonAreaProps) {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (!calledOnce.current) {
      calledOnce.current = true;

      getAllBooks()
        .then(result => {
          setBooks(result.books);
          setCount(result.count);
          console.log(`Books found: ${result.count}`);
        })
        .catch(error => {
          console.error("Failed to fetch books:", error);
        });
    }
  }, [setBooks, setCount]);

  return (
    <div className="button-area">
      <ReloadBooksButton setBooks={setBooks} setCount={setCount} />
      <CreateBookButton setBooks={setBooks} />
    </div>
  );
}

export default ButtonArea;
