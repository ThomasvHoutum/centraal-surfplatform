import React, { useState } from "react";

export default function RegisterModal({ isOpen, onClose }) {
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <div
      className={`register-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={onClose}
    >
      <div className="register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="modal-title">Registreren</h2>
        <label className="modal-label" htmlFor="reg-email">
          E-mail
        </label>
        <input id="reg-email" type="email" className="modal-input" />
        <label className="modal-label" htmlFor="reg-user">
          Gebruikersnaam
        </label>
        <input id="reg-user" type="text" className="modal-input" />
        <div className="password-row">
          <label className="modal-label" htmlFor="reg-pass">
            Wachtwoord
          </label>
          <button
            type="button"
            className="eye-toggle"
            onClick={() => setShow(!show)}
            aria-label="Toon wachtwoord"
          >
            <svg
              className="eye-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <input
          id="reg-pass"
          type={show ? "text" : "password"}
          className="modal-input"
        />
        <button className="btn btn-primary modal-submit" disabled={!agree}>
          Registreren
        </button>
        <label className="terms-row">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>
            Door een account aan te maken, ga je akkoord met onze voorwaarden.
          </span>
        </label>
      </div>
    </div>
  );
}
