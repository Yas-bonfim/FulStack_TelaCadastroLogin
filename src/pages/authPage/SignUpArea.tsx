import "./SignUpArea.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import registerUser from "../../api/RegisterUser";
import Header from "./Header";
import "./Page.css";

function SignUpArea({ backendUrl }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setIsLoading(true);

      if (!backendUrl) {
        throw new Error("Backend URL is not configured");
      }

      const response = await registerUser(backendUrl, name, email, password);

      setSuccessMessage(response.message);
      toast.success("User successfully created");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      //ErrorHandler will deal with the error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
          <p className="register-link">
            Já possui uma conta? <Link to="/login">Faça Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpArea;