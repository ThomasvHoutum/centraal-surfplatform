import React from "react";

export default function ResetPasswordModal({ isOpen, onClose }) {
  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">
          Wachtwoord<br />opnieuw instellen
        </h2>
        <label className="modal-label" htmlFor="reset-email">
          E-mail
        </label>
        <input id="reset-email" type="email" className="modal-input" />
        <button className="btn btn-primary modal-submit">Stuur mij een link</button>
      </div>
    </div>
  );
}
