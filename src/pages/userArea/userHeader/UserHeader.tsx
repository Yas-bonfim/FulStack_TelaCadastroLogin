import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserHeader.css";

function UserHeader() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }
  function handleHome(){
    navigate("/books")
  }

  return (
    <div className="user-header">
      <header>
        <div className="user-header-text">
          <h1>Estente Magica</h1>
          <h2></h2>
        </div>
        <section>
          <button className="user-header-button" onClick={handleHome}>Home</button>
          <button className="user-header-button" onClick={handleLogout}>Logout</button>
        </section>
      </header>
    </div>
  );
}

export default UserHeader;