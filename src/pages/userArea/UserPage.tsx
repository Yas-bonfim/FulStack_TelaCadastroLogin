import React from "react";
import UserHeader from "./userHeader/UserHeader";
import UserBody from "./userBody/userBody";
import "./UserPage.css";

function UserPage() {

  return (
    <div className="user-page">
      <UserHeader />
      <UserBody />
    </div>
  );
}

export default UserPage;
