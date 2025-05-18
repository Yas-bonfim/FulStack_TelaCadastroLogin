import "./LoginArea.css";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginUser from "../../api/LoginUser";

interface LoginAreaProps {
  backendUrl: string;
}

function LoginArea({ backendUrl }: LoginAreaProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Email e senha são obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);

      if (!backendUrl) {
        throw new Error("A URL do backend não está configurada.");
      }

      const response = await LoginUser(backendUrl, email, password);

      toast.success("Login realizado com sucesso!");

      // Salva o token JWT
      localStorage.setItem("authToken", response.token);

      // Redireciona para a nova página da lista de livros
      navigate("/books");
    } catch (err: any) {
      // Erros tratados dentro de LoginUser
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <p>Entre com sua conta. Se não tiver uma, cadastre-se.</p>
        </div>
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>
        <p className="register-link">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginArea;

