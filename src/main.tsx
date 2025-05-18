import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginArea from "./pages/authPage/LoginArea";
import SignUpArea from "./pages/authPage/SignUpArea";
import BookListArea from "./pages/userArea/userBody/BookLists/BookListArea";
import ErrorPage from "./pages/Error/ErrorPage";


 // Ajuste para seu backend real
 const apiUrl = (import.meta as any).env.VITE_BACKEND_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginArea backendUrl={apiUrl} />} />
          <Route path="/login" element={<LoginArea backendUrl={apiUrl} />} />
          <Route path="/register" element={<SignUpArea backendUrl={apiUrl} />} />
          <Route path="/books" element={<BookListArea />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);
