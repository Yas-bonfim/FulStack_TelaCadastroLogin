import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBook } from "../../../../../api/CreateBook";
import UpdateBook from "../../../../../api/UpdateBook";
import PatchBook from "../../../../../api/PatchBook";
import { getBookById } from "../../../../../api/GetBookById";
import "./PopupModal.css";

interface CreateBookWithPopupProps {
  bookId: string;
  onBookCreated?: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const CreateBookWithPopup: React.FC<CreateBookWithPopupProps> = ({ bookId, onBookCreated, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedYear: 0, // Garantir que seja um número
    description: "",
  });
  const [originalData, setOriginalData] = useState({
    title: "",
    author: "",
    publishedYear: 0, // Garantir que seja um número
    description: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      if (bookId !== "new") {
        try {
          const book = await getBookById(bookId);
          const bookData = {
            title: book.title,
            author: book.author,
            publishedYear: book.publishedYear || 0, // Garantir que seja um número
            description: book.description || "",
          };
          setFormData(bookData);
          setOriginalData(bookData);
        } catch (err) {
          console.error("Erro ao buscar livro:", err);
          toast.error("Erro ao carregar os dados do livro.");
        }
      }
    };

    if (isOpen && bookId !== "new") {
      fetchBook();
    }
  }, [bookId, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.author) {
        toast.error("Título e Autor são obrigatórios.");
        return;
      }

      const newBook = {
        _id: bookId !== "new" ? bookId : "", // Sempre uma string
        title: formData.title,
        author: formData.author,
        description: formData.description,
        publishedYear: formData.publishedYear, // Já garantido como número
        status: "Quero ler" as "Lido" | "Lendo" | "Quero ler", // valor padrão permitido
      };

      if (bookId === "new") {
        // Remove _id para criação
        const { _id, ...bookToCreate } = newBook;
        await createBook(bookToCreate);
        toast.success("Livro criado com sucesso.");
      } else {
        // Verifica se todos os campos mudaram
        const allFieldsChanged = Object.keys(originalData).every(
          (key) => formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]
        );

        const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;
        const token = localStorage.getItem("authToken") || "";

        if (allFieldsChanged) {
          console.log("[UpdateBook] Todos os campos mudaram. Usando UpdateBook.");
          await UpdateBook(apiUrl, token, bookId, newBook);
          toast.success("Livro atualizado com sucesso (UpdateBook).");
        } else {
          console.log("[PatchBook] Nem todos os campos mudaram. Usando PatchBook.");
          const partialBook = Object.keys(formData).reduce((acc, key) => {
            if (formData[key as keyof typeof formData] !== originalData[key as keyof typeof originalData]) {
              acc[key] = formData[key as keyof typeof formData];
            }
            return acc;
          }, {} as Record<string, string | number>);
          await PatchBook(apiUrl, token, bookId, partialBook);
          toast.success("Livro atualizado com sucesso (PatchBook).");
        }
      }

      onClose();
      setFormData({
        title: "",
        author: "",
        publishedYear: 0, // Reset como número
        description: "",
      });
      onBookCreated?.();

      // Recarrega a página automaticamente
      window.location.reload();
    } catch (err) {
      console.error("Erro ao salvar livro:", err);
      toast.error("Erro ao salvar livro.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-modal">
        <h2>{bookId === "new" ? "Novo Livro" : "Editar Livro"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Título:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <label>Autor:</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            required
          />
          <label>Descrição:</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <label>Ano de Publicação:</label>
          <input
            type="number"
            min="1000"
            max={new Date().getFullYear()}
            value={formData.publishedYear}
            onChange={(e) => setFormData({ ...formData, publishedYear: Number(e.target.value) })}
          />
          <button type="submit" className="confirm-button">
            Salvar
          </button>
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBookWithPopup;
