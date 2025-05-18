import React, { useState } from "react";
import { toast } from "react-toastify";
import { createBook } from "../../api/CreateBook";

interface AddBookFormProps {
  onBookAdded: () => void;
}

function AddBookForm({ onBookAdded }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [status, setStatus] = useState<"Lido" | "Lendo" | "Quero ler">("Quero ler");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Usuário não autenticado.");
        return;
      }

      // Criação do payload no formato esperado
      const newBook: any = {
        title,
        author,
        genre,
      };
      if (year !== "") {
        newBook.year = year;
      }

      await createBook(newBook);

      toast.success("Livro adicionado com sucesso!");
      setTitle("");
      setAuthor("");
      setGenre("");
      setDescription("");
      setYear("");
      setStatus("Quero ler");
      onBookAdded(); // Atualiza a lista de livros
    } catch (error: any) {
      toast.error("Erro ao adicionar o livro.");
      console.error(error);
    }
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h3>Adicionar Livro</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Gênero"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <textarea
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ano de Publicação (opcional)"
        value={year}
        onChange={(e) => setYear(Number(e.target.value) || "")}
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "Lido" | "Lendo" | "Quero ler")}
      >
        <option value="Quero ler">Quero ler</option>
        <option value="Lendo">Lendo</option>
        <option value="Lido">Lido</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AddBookForm;
