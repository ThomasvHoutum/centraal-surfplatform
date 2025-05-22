// pages/AccountPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccountPage.css";

export default function AccountPage() {
  const navigate = useNavigate();
  const user = {
    name: "Steve Surfy",
    email: "stevesurfy1988@hotmail.com",
    phone: "0612345678",
  };

  return (
    <div className="account-page">
      <header className="account-header">
        <button className="back-btn" onClick={() => navigate(-1)}>‹</button>
        <h1 className="account-title">Accountgegevens</h1>
      </header>
      <div className="account-list">
        <div className="account-item">
          <label className="item-label">Naam</label>
          <input className="item-input" value={user.name} readOnly />
        </div>
        <div className="account-item">
          <label className="item-label">E-mail adres</label>
          <input className="item-input" value={user.email} readOnly />
        </div>
        <div className="account-item">
          <label className="item-label">Telefoon nummer</label>
          <input className="item-input" value={user.phone} readOnly />
        </div>
      </div>
    </div>
  );
}
